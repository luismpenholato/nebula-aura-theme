# Changelog

All notable changes to Nebula Aura Theme will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.0.7] - 2026-08-16

### Added

- Modern Chat and Agent Session colors.
- Inline Edit and Inline Chat styling.
- Horizontal Activity Bar support for current Cursor layouts.
- Multi Diff, SCM Graph, terminal, testing, notebook and comments colors.
- Validation for modern, deprecated and transparency-sensitive theme colors.

### Changed

- Improved support for current VS Code and VS Code-based IDE interfaces.
- Improved overlay transparency across selections, diffs, drag and drop, comments and AI edits.
- Updated notification colors to the current VS Code color identifiers.

### Removed

- Deprecated and unsupported notification and Settings color identifiers.

## [0.0.6] - 2026-07-11

### Added

- GitHub Sponsors support in the repository and extension marketplace.
- Community issue templates and pull request template.
- Security policy and code of conduct.
- Continuous integration workflow for theme validation and packaging.
- Project changelog.

### Changed

- Improved project documentation and repository metadata.

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
