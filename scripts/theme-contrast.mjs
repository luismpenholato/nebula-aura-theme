const hexPattern = /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
export const minimumTextContrast = 4.5;

function parseColor(value) {
  const color = typeof value === "string" ? value.trim() : "";
  if (!hexPattern.test(color)) {
    throw new Error(`invalid contrast color "${value}"`);
  }
  let hex = color.slice(1);
  if (hex.length <= 4) {
    hex = [...hex].map((digit) => digit + digit).join("");
  }
  return [
    ...[0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255),
    hex.length === 8 ? parseInt(hex.slice(6), 16) / 255 : 1,
  ];
}

function composite(foreground, background) {
  return foreground.slice(0, 3).map((channel, index) =>
    channel * foreground[3] + background[index] * (1 - foreground[3]),
  );
}

function luminance(rgb) {
  const linear = rgb.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

// Transparent highlights must be composed over the actual editor surface.
export function contrastRatio(foreground, background, underlay) {
  let surface = parseColor(background);
  if (surface[3] < 1) {
    const base = parseColor(underlay);
    if (base[3] !== 1) {
      throw new Error("contrast underlay must be opaque");
    }
    surface = [...composite(surface, base), 1];
  }
  const text = luminance(composite(parseColor(foreground), surface));
  const backdrop = luminance(surface.slice(0, 3));
  return (Math.max(text, backdrop) + 0.05) / (Math.min(text, backdrop) + 0.05);
}

export function validateThemeContrast(theme) {
  const errors = [];
  const colors = theme.colors ?? {};
  const background = colors["editor.background"];
  const activeLine = colors["editor.lineHighlightBackground"] ?? background;
  const semanticComment = theme.semanticTokenColors?.comment;
  const comment = typeof semanticComment === "string" ? semanticComment : semanticComment?.foreground;

  function check(property, foreground, surface, underlay) {
    try {
      const ratio = contrastRatio(foreground, surface, underlay);
      if (ratio < minimumTextContrast) {
        errors.push({ property, problem: `contrast ${ratio.toFixed(3)}:1 is below ${minimumTextContrast}:1` });
      }
    } catch (error) {
      errors.push({ property, problem: error.message });
    }
  }

  for (const [property, foreground] of [
    ["colors.editor.foreground", colors["editor.foreground"]],
    ["semanticTokenColors.comment", comment],
  ]) {
    check(property, foreground, background);
    check(`${property} (active line)`, foreground, activeLine, background);
  }

  const commentRules = (Array.isArray(theme.tokenColors) ? theme.tokenColors : [])
    .map((rule, index) => ({ rule, index }))
    .filter(({ rule }) => {
      const scopes = Array.isArray(rule.scope) ? rule.scope : String(rule.scope ?? "").split(",");
      return scopes.some((scope) => ["comment", "string.quoted.docstring.multi"].includes(scope.trim()));
    });
  if (!commentRules.some(({ rule }) => {
    const scopes = Array.isArray(rule.scope) ? rule.scope : String(rule.scope ?? "").split(",");
    return scopes.some((scope) => scope.trim() === "comment");
  })) {
    errors.push({ property: "tokenColors", problem: "missing base TextMate comment rule" });
  }
  for (const { rule, index } of commentRules) {
    const property = `tokenColors[${index}].settings.foreground`;
    check(property, rule.settings?.foreground, background);
    check(`${property} (active line)`, rule.settings?.foreground, activeLine, background);
  }

  check(
    "colors.editorBracketMatch.foreground",
    colors["editorBracketMatch.foreground"],
    colors["editorBracketMatch.background"],
    background,
  );
  return errors;
}
