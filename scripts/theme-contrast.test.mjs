import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { contrastRatio, validateThemeContrast } from "./theme-contrast.mjs";

function themeFixture() {
  return {
    colors: {
      "editor.background": "#fff",
      "editor.foreground": "#111",
      "editor.lineHighlightBackground": "#eee",
      "editorBracketMatch.background": "#0001",
      "editorBracketMatch.foreground": "#111",
    },
    semanticTokenColors: { comment: { foreground: "#555" } },
    tokenColors: [{ scope: ["comment"], settings: { foreground: "#555" } }],
  };
}

test("black and white have contrast 21:1; equal colors have 1:1", () => {
  assert.equal(contrastRatio("#000", "#fff"), 21);
  assert.equal(contrastRatio("#fff", "#000"), 21);
  assert.equal(contrastRatio("#abc", "#abc"), 1);
});

test("short and long hex forms are equivalent, including alpha", () => {
  assert.equal(contrastRatio(" #AbC ", "#000"), contrastRatio("#aabbcc", "#000000"));
  assert.equal(contrastRatio("#1238", "#fff"), contrastRatio("#11223388", "#ffffff"));
});

test("transparent foreground is composed over the background", () => {
  assert.equal(contrastRatio("#0000", "#fff"), 1);
  assert.equal(contrastRatio("#0008", "#fff"), contrastRatio("#777", "#fff"));
});

test("transparent background is composed over the supplied underlay", () => {
  assert.equal(contrastRatio("#000", "#0000", "#fff"), 21);
  assert.equal(contrastRatio("#000", "#0008", "#fff"), contrastRatio("#000", "#777"));
  assert.throws(() => contrastRatio("#000", "#0008"), /invalid contrast color/);
  assert.throws(() => contrastRatio("#000", "#0008", "#fff8"), /must be opaque/);
});

test("invalid colors are rejected instead of silently passing as NaN", () => {
  for (const color of [undefined, null, "red", "#ggg", "#12345", ""]) {
    assert.throws(() => contrastRatio(color, "#fff"), /invalid contrast color/);
  }
});

test("sRGB contrast matches a known near-threshold pair without rounding up", () => {
  assert.ok(Math.abs(contrastRatio("#777", "#fff") - 4.478089453577214) < 1e-12);
  const theme = themeFixture();
  theme.semanticTokenColors.comment.foreground = "#777";
  assert.ok(validateThemeContrast(theme).some(({ property }) => property === "semanticTokenColors.comment"));
});

test("readable theme supports semantic string colors and comma-separated scopes", () => {
  const theme = themeFixture();
  theme.semanticTokenColors.comment = "#555";
  theme.tokenColors[0].scope = "comment, punctuation.definition.comment";
  assert.deepEqual(validateThemeContrast(theme), []);
});

test("active line contrast is validated separately", () => {
  const theme = themeFixture();
  theme.colors["editor.lineHighlightBackground"] = "#666";
  assert.ok(validateThemeContrast(theme).some(({ property }) => property.endsWith("(active line)")));
});

test("TextMate comments and docstrings cannot regress independently of semantic colors", () => {
  const theme = themeFixture();
  theme.tokenColors[0].settings.foreground = "#ccc";
  theme.tokenColors.push({ scope: "string.quoted.docstring.multi", settings: { foreground: "#ddd" } });
  const errors = validateThemeContrast(theme);
  assert.ok(errors.some(({ property }) => property === "tokenColors[0].settings.foreground"));
  assert.ok(errors.some(({ property }) => property === "tokenColors[1].settings.foreground"));
});

test("missing base comment and semantic colors produce actionable errors", () => {
  const theme = themeFixture();
  theme.tokenColors = [];
  delete theme.semanticTokenColors.comment;
  const errors = validateThemeContrast(theme);
  assert.ok(errors.some(({ property }) => property === "tokenColors"));
  assert.ok(errors.some(({ property }) => property === "semanticTokenColors.comment"));
});

test("bracket foreground must remain readable over its translucent highlight", () => {
  const theme = themeFixture();
  theme.colors["editorBracketMatch.foreground"] = "#eee";
  assert.ok(validateThemeContrast(theme).some(({ property }) => property === "colors.editorBracketMatch.foreground"));
});

const manifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const previousComments = ["#7E7899", "#6B7094", "#6E5F96", "#64748B"];
for (const entry of manifest.contributes.themes) {
  test(`${entry.label}: generated theme meets the contrast baseline`, async () => {
    const theme = JSON.parse(await readFile(new URL(`../${entry.path}`, import.meta.url), "utf8"));
    assert.deepEqual(validateThemeContrast(theme), []);
  });
  test(`${entry.label}: reverting its old comment color is detected`, async () => {
    const theme = JSON.parse(await readFile(new URL(`../${entry.path}`, import.meta.url), "utf8"));
    theme.semanticTokenColors.comment.foreground = previousComments[manifest.contributes.themes.indexOf(entry)];
    assert.ok(validateThemeContrast(theme).some(({ property }) => property === "semanticTokenColors.comment"));
  });
}
