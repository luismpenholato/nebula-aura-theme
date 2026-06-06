# Contributing

Thanks for your interest in Nebula Aura Theme.

## Local setup

```bash
git clone https://github.com/luismpenholato/nebula-aura-theme.git
cd nebula-aura-theme
npm install
```

## Test in the Extension Development Host

1. Open this folder in VS Code or Cursor.
2. Press `F5` to launch the Extension Development Host.
3. Open the Command Palette (`Ctrl+Shift+P`) → **Preferences: Color Theme** → select a Nebula Aura theme.

## Before opening a pull request

Run these commands and confirm they succeed:

```bash
npm run list
npm run package
```

- `npm run list` — verify the files included in the package.
- `npm run package` — confirm the extension packages without errors.

## Guidelines

- Do **not** commit `.vsix` files. They are generated locally and attached to GitHub Releases when needed.
- If you change theme colors, include updated screenshots in `images/` and update the README previews when relevant.
- Keep attribution intact. Do not remove or alter [NOTICE](NOTICE) or the credits section in the README.

## Questions

Open a [GitHub Issue](https://github.com/luismpenholato/nebula-aura-theme/issues) for bugs, suggestions or questions.
