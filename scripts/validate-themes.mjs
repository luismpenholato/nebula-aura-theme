import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packagePath = path.join(rootDir, "package.json");
const colorPattern = /^#(?:[0-9A-Fa-f]{3,4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

const requiredRootKeys = [
  "name",
  "type",
  "colors",
  "tokenColors",
  "semanticHighlighting",
  "semanticTokenColors",
];

const requiredColorKeys = [
  "editor.background",
  "editor.foreground",
  "editorCursor.foreground",
  "editor.selectionBackground",
  "activityBar.background",
  "sideBar.background",
  "statusBar.background",
  "titleBar.activeBackground",
  "editorError.foreground",
  "editorWarning.foreground",
  "editorInfo.foreground",
];

const requiredSemanticTokens = [
  "namespace",
  "class",
  "interface",
  "struct",
  "enum",
  "typeParameter",
  "method",
  "function",
  "property",
  "parameter",
  "variable",
  "enumMember",
  "decorator",
  "event",
  "keyword",
  "string",
  "number",
  "comment",
];

const requiredSemanticModifiers = [
  "*.readonly",
  "*.static",
  "*.abstract",
  "*.deprecated",
  "*.declaration",
];

const errors = [];

function report(file, property, problem) {
  errors.push({ file, property, problem });
}

function normalizeColor(value) {
  return typeof value === "string" ? value.trim() : value;
}

function validateColor(file, propertyPath, color) {
  if (!colorPattern.test(color)) {
    report(file, propertyPath, `invalid color format "${color}"`);
  }
}

function collectSemanticColors(value, file, propertyPath) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return;
  }

  for (const [key, nested] of Object.entries(value)) {
    const nextPath = `${propertyPath}.${key}`;
    if (typeof nested === "string") {
      validateColor(file, nextPath, normalizeColor(nested));
      continue;
    }

    if (nested && typeof nested === "object") {
      if (typeof nested.foreground === "string") {
        validateColor(file, `${nextPath}.foreground`, normalizeColor(nested.foreground));
      }
      if (typeof nested.background === "string") {
        validateColor(file, `${nextPath}.background`, normalizeColor(nested.background));
      }
    }
  }
}

function validateThemeFile(theme, relativePath) {
  for (const key of requiredRootKeys) {
    if (!(key in theme)) {
      report(relativePath, key, "missing required property");
    }
  }

  if (theme.type !== "light" && theme.type !== "dark") {
    report(relativePath, "type", `must be "light" or "dark", found "${theme.type}"`);
  }

  if (theme.semanticHighlighting !== true) {
    report(relativePath, "semanticHighlighting", 'must be true');
  }

  if (!theme.colors || typeof theme.colors !== "object") {
    report(relativePath, "colors", "must be an object");
    return;
  }

  for (const key of requiredColorKeys) {
    if (!(key in theme.colors)) {
      report(relativePath, `colors.${key}`, "missing required color");
    }
  }

  const errorColor = normalizeColor(theme.colors["editorError.foreground"]);
  const warningColor = normalizeColor(theme.colors["editorWarning.foreground"]);
  const infoColor = normalizeColor(theme.colors["editorInfo.foreground"]);

  if (errorColor && warningColor && errorColor === warningColor) {
    report(relativePath, "colors.editorWarning.foreground", "must differ from editorError.foreground");
  }

  if (errorColor && infoColor && errorColor === infoColor) {
    report(relativePath, "colors.editorInfo.foreground", "must differ from editorError.foreground");
  }

  if (warningColor && infoColor && warningColor === infoColor) {
    report(relativePath, "colors.editorInfo.foreground", "must differ from editorWarning.foreground");
  }

  for (const [key, value] of Object.entries(theme.colors)) {
    validateColor(relativePath, `colors.${key}`, normalizeColor(value));
  }

  if (!theme.semanticTokenColors || typeof theme.semanticTokenColors !== "object") {
    report(relativePath, "semanticTokenColors", "must be an object");
    return;
  }

  for (const token of requiredSemanticTokens) {
    if (!(token in theme.semanticTokenColors)) {
      report(relativePath, `semanticTokenColors.${token}`, "missing semantic token");
    }
  }

  for (const modifier of requiredSemanticModifiers) {
    if (!(modifier in theme.semanticTokenColors)) {
      report(relativePath, `semanticTokenColors.${modifier}`, "missing semantic modifier");
    }
  }

  collectSemanticColors(theme.semanticTokenColors, relativePath, "semanticTokenColors");
}

const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
const themeEntries = packageJson.contributes?.themes ?? [];
const labels = new Set();

if (themeEntries.length === 0) {
  report("package.json", "contributes.themes", "no themes configured");
}

for (const entry of themeEntries) {
  if (!entry.label) {
    report("package.json", "contributes.themes", "theme entry missing label");
    continue;
  }

  if (labels.has(entry.label)) {
    report("package.json", `contributes.themes.${entry.label}`, "duplicate theme label");
  }
  labels.add(entry.label);

  if (!entry.path) {
    report("package.json", `contributes.themes.${entry.label}`, "missing theme path");
    continue;
  }

  const themePath = path.join(rootDir, entry.path);
  const relativePath = entry.path.replace(/^\.\//, "");

  let rawTheme;
  try {
    rawTheme = await readFile(themePath, "utf8");
  } catch {
    report(relativePath, "(file)", "theme file not found");
    continue;
  }

  let theme;
  try {
    theme = JSON.parse(rawTheme);
  } catch (error) {
    report(relativePath, "(file)", `invalid JSON: ${error.message}`);
    continue;
  }

  if (theme.name !== entry.label) {
    report(relativePath, "name", `expected "${entry.label}", found "${theme.name}"`);
  }

  validateThemeFile(theme, relativePath);
}

if (errors.length > 0) {
  console.error("Theme validation failed:\n");
  for (const { file, property, problem } of errors) {
    console.error(`- ${file}`);
    console.error(`  property: ${property}`);
    console.error(`  problem: ${problem}\n`);
  }
  process.exit(1);
}

console.log(`Validated ${themeEntries.length} theme files successfully.`);
