# Nebula Aura Theme

[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nebula-themes.nebula-aura-theme)

[![Open VSX Downloads](https://img.shields.io/open-vsx/dt/nebula-themes/nebula-aura-theme?label=Open%20VSX%20downloads)](https://open-vsx.org/extension/nebula-themes/nebula-aura-theme)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A modern light, dark and violet theme pack for VS Code, Cursor and Antigravity, inspired by Omni.

## Themes

- **Nebula Aura Light** — soft light background with violet and cyan accents
- **Nebula Aura Dark** — calm dark theme with blue-gray tones
- **Nebula Aura Violet** — deep violet background with magenta and mint highlights

## Install

### Visual Studio Marketplace

Install from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nebula-themes.nebula-aura-theme):

<https://marketplace.visualstudio.com/items?itemName=nebula-themes.nebula-aura-theme>

### Open VSX

Install from [Open VSX](https://open.vsx.org/extension/nebula-themes/nebula-aura-theme):

<https://open-vsx.org/extension/nebula-themes/nebula-aura-theme>

After installing, open the Command Palette (`Ctrl+Shift+P`) → **Preferences: Color Theme** → choose **Nebula Aura Light**, **Nebula Aura Dark** or **Nebula Aura Violet**.

## Compatibility

| Editor | Support |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/) | Full |
| [Cursor](https://cursor.com/) | Full |
| [Antigravity](https://antigravity.dev/) | Full |

## Previews

### Nebula Aura Light

![Nebula Aura Light](./images/preview-light.png)

### Nebula Aura Dark

![Nebula Aura Dark](./images/preview-dark.png)

### Nebula Aura Violet

![Nebula Aura Violet](./images/preview-violet.png)

## Install from VSIX (local)

If you prefer a local install, download the `.vsix` from [GitHub Releases](https://github.com/luismpenholato/nebula-aura-theme/releases) or build it locally (see [Maintainer workflow](#maintainer-workflow)).

1. Open your editor.
2. Go to **Extensions** → **...** → **Install from VSIX...**
3. Select the `.vsix` file.

**CLI install:**

```bash
code --install-extension nebula-aura-theme-0.0.1.vsix
cursor --install-extension nebula-aura-theme-0.0.1.vsix
antigravity --install-extension nebula-aura-theme-0.0.1.vsix
```

## Publishing

This extension is published to:

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=nebula-themes.nebula-aura-theme)
- [Open VSX Registry](https://open-vsx.org/extension/nebula-themes/nebula-aura-theme)

Publishing is currently manual.

## Maintainer workflow

### Build the VSIX locally

```bash
git clone https://github.com/luismpenholato/nebula-aura-theme.git
cd nebula-aura-theme
npm install
npm run list
npm run package
```

- `npm run list` — lists the files that will be included in the package (useful to verify nothing sensitive is bundled).
- `npm run package` — generates `nebula-aura-theme-0.0.1.vsix` in the project root.

### GitHub Release (manual)

1. Commit and push your changes.
2. Generate the VSIX: `npm run package`
3. Create and push a tag:

   ```bash
   git tag v0.0.1
   git push origin v0.0.1
   ```

4. On GitHub: **Releases** → **Draft a new release**
   - **Tag:** `v0.0.1`
   - **Title:** `v0.0.1`
   - **Attach:** `nebula-aura-theme-0.0.1.vsix`
   - **Publish release**

The `.vsix` is **not** committed to the repository — attach it only to the GitHub Release.

## Development

1. Open this folder in VS Code or Cursor.
2. Press `F5` to launch the Extension Development Host.
3. **Command Palette** → **Preferences: Color Theme** → select a Nebula Aura theme.

## Credits

Nebula Aura Theme is based on/inspired by [Omni for Visual Studio Code](https://github.com/getomni/visual-studio-code), originally created by Rocketseat and licensed under the MIT License. This project is not affiliated with Rocketseat or the Omni Theme project.

See [NOTICE](NOTICE) for attribution details.

## Disclaimer

This project is not affiliated with Microsoft, Visual Studio Code, Cursor, Antigravity, Rocketseat or the Omni Theme project.

## License

MIT — see [LICENSE](LICENSE).
