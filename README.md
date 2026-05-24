# Nebula Aura Theme

A modern theme pack with **three variations** for **Visual Studio Code**, **Cursor** and **Antigravity**:

| Theme | UI base | Description |
| --- | --- | --- |
| **Nebula Aura Light** | `vs` | Soft light background with violet and cyan accents |
| **Nebula Aura Dark** | `vs-dark` | Calm dark theme with blue-gray tones |
| **Nebula Aura Violet** | `vs-dark` | Deep violet background with magenta and mint highlights |

The extension is distributed as a **`.vsix`** file — the standard format for VS Code-compatible editors.

## Compatibility

| Editor | Support |
| --- | --- |
| [Visual Studio Code](https://code.visualstudio.com/) | Full |
| [Cursor](https://cursor.com/) | Full |
| [Antigravity](https://antigravity.dev/) | Full (VS Code fork, same `.vsix` format) |

> Antigravity uses its own extensions folder. Installing the theme in VS Code or Cursor does **not** install it automatically in Antigravity — use the `.vsix` in each editor separately.

## Previews

### Nebula Aura Light

![Nebula Aura Light](./images/preview-light.png)

### Nebula Aura Dark

![Nebula Aura Dark](./images/preview-dark.png)

### Nebula Aura Violet

![Nebula Aura Violet](./images/preview-violet.png)

## Install from VSIX (local)

1. Download `nebula-aura-theme-0.0.1.vsix` from the [GitHub Releases](https://github.com/luismpenholato/nebula-aura-theme/releases) page, or build it locally (see below).
2. Open your editor.
3. Go to **Extensions** → **...** → **Install from VSIX...**
4. Select the `.vsix` file.
5. Open the Command Palette (`Ctrl+Shift+P`) → **Preferences: Color Theme** → choose **Nebula Aura Light**, **Nebula Aura Dark** or **Nebula Aura Violet**.

### CLI install

**VS Code:**

```bash
code --install-extension nebula-aura-theme-0.0.1.vsix
```

**Cursor:**

```bash
cursor --install-extension nebula-aura-theme-0.0.1.vsix
```

**Antigravity** (if CLI is available):

```bash
antigravity --install-extension nebula-aura-theme-0.0.1.vsix
```

## Build the VSIX locally

```bash
git clone https://github.com/luismpenholato/nebula-aura-theme.git
cd nebula-aura-theme
npm install
npm run list
npm run package
```

- `npm run list` — lists the files that will be included in the package (useful to verify nothing sensitive is bundled).
- `npm run package` — generates `nebula-aura-theme-0.0.1.vsix` in the project root.

## GitHub Release (manual)

Automated publishing is **not** configured. To create a release manually:

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

## Visual Studio Marketplace

Publication to the [Visual Studio Marketplace](https://marketplace.visualstudio.com/) will be done **manually** in a future step. Do **not** use a ZIP file — the correct artifact is the `.vsix`.

Before publishing, update `publisher` in `package.json` with your Marketplace publisher ID.

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
