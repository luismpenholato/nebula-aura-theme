# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.5] - 2026-07-10

### Added

- Added semantic token colors for improved language-aware syntax highlighting, including modifier support for readonly, static, abstract, deprecated and declaration scopes.
- Added theme validation for required properties, valid colors and registered theme files.
- Added support for newer editor surfaces, including inlay hints, sticky scroll, quick input, chat interfaces and command center styling.
- Added optimized WebP preview images for the README.

### Changed

- Improved diagnostic color consistency across light, dark, violet and midnight themes.
- Updated warning, information and hint colors to better reflect their semantic roles.
- Updated README previews to use optimized WebP images with consistent dimensions and display width.
- Improved maintainability by formatting theme files for easier review.

### Fixed

- Fixed warning colors that were visually conflicting with informational colors.
- Fixed inconsistent diagnostic hierarchy across theme variants.

## [0.0.4] - 2026-06-28

### Added

- **Nebula Aura Midnight** — deep night dark theme with indigo and cyan accents.
- Marketplace preview screenshot for Midnight in the README.

### Changed

- README: themes table, previews section and extension keywords updated for the expanded pack.

## [0.0.3] - 2026-06-20

### Changed

- CI and publish workflows: upgraded `actions/checkout` and `actions/setup-node` to v6, and updated Node.js from 20 to 24.
- Development dependencies: security updates for transitive packages via `npm audit fix` (`form-data`, `js-yaml`, `tmp`, `undici`).

## [0.0.2] - 2026-06-06

### Added

- CI workflow to validate extension packaging on pull requests and pushes to `main`.
- Publish workflow to release the extension on semantic version tags (`v*.*.*`).
- Automated publishing to Visual Studio Marketplace and Open VSX Registry.
- Automated GitHub Release creation with `.vsix` attachment and generated release notes.
- `CONTRIBUTING.md` and `SECURITY.md`.

### Changed

- README presentation: marketplace links, Open VSX badges, install section and contributing reference.
- Extension metadata: keywords, `galleryBanner` and `engines.vscode` requirement.

## [0.0.1] - 2026-05-24

### Added

- Nebula Aura Light, Dark and Violet themes for VS Code, Cursor and Antigravity.
- Semantic highlighting, bracket pair colors and syntax support for C#, TypeScript, JavaScript, JSON, HTML, CSS, Razor, Markdown and SQL.
- Optimized extension package with compressed preview assets.
