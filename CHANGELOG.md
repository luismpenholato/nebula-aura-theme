# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
