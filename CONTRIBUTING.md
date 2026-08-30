# Contributing

Thanks for your interest in Nebula Aura Theme.

## Local setup

```bash
git clone https://github.com/luismpenholato/nebula-aura-theme.git
cd nebula-aura-theme
npm ci
```

## Test in the Extension Development Host

1. Open this folder in VS Code or Cursor.
2. Press `F5` to launch the Extension Development Host.
3. Open the Command Palette (`Ctrl+Shift+P`) → **Preferences: Color Theme** → select a Nebula Aura theme.

## Before opening a pull request

Run these commands and confirm they succeed:

```bash
npm ci
npm run themes:generate
npm run themes:validate
npm run list
npm run package
```

- `npm ci` — install dependencies from the lockfile for reproducible validation.
- `npm run themes:generate` — regenerate theme JSON files from `scripts/generate-themes.mjs`.
- `npm run themes:validate` — run contrast regression tests, then verify required theme properties, colors, modern tokens, deprecated identifiers, overlay transparency and registrations.
- `npm run list` — verify the files included in the package.
- `npm run package` — generate, validate and package the extension as a `.vsix`.

## Contrast and visual compatibility

Edit palettes in `scripts/generate-themes.mjs`, then regenerate the theme files. Do not edit generated JSON files directly.

The automated baseline is 4.5:1 for editor text, base semantic and TextMate comments, and docstrings against both the editor and active-line backgrounds. Matching-bracket text is checked against its highlight composed over the editor background. Alpha channels are composed before measuring contrast, and ratios are not rounded before comparison. This is a targeted readability check, not a claim that every syntax token or UI surface meets WCAG.

For each release, manually check all four variants in the current stable versions of VS Code, Cursor and Antigravity IDE:

- Record the editor version, operating system and language extension versions in the pull request or release validation notes.
- Check C#, TypeScript and Python comments/docstrings with semantic highlighting on and off, including the active line.
- Check matching brackets, selected text, search highlights, suggestions, diagnostics and inline edits.
- Check terminal selection, added/removed diff lines, sidebars and chat code blocks in both light and dark modes.
- Check Cursor's Agents Window separately from its IDE, and Antigravity's agent interface separately from its editor. Do not assume every custom interface consumes the same theme tokens.
- Capture actual editor screenshots for visual changes; record untested surfaces as untested rather than marking them passed.

Use the [VS Code color reference](https://code.visualstudio.com/api/references/theme-color), [Cursor theme documentation](https://cursor.com/help/customization/themes) and [Antigravity changelog](https://antigravity.google/changelog) to check editor-specific changes. For the contrast formula and text baseline, see [WCAG contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

## Guidelines

- Open an issue before large visual changes so direction can be discussed early.
- Do **not** commit `.vsix` files. They are generated locally and attached to GitHub Releases when needed.
- If you change theme colors, include updated screenshots in `images/` and update the README previews when relevant.
- Update [CHANGELOG.md](CHANGELOG.md) when your change is user-facing and belongs in a release.
- Keep attribution intact. Do not remove or alter [NOTICE](NOTICE) or the credits section in the README.

## Questions

Open a [GitHub Issue](https://github.com/luismpenholato/nebula-aura-theme/issues) for bugs, suggestions or questions.
