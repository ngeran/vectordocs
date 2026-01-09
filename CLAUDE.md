# CLAUDE.md
Guidance for Claude Code when working with this Docusaurus documentation site.

## Quick Reference
- **Framework:** Docusaurus 3.9.2 (React/TypeScript)
- **Node Version:** >= 20.0
- **Deploy Target:** GitHub Pages (`ngeran.github.io/vectordocs/`)
- **Base URL:** `/vectordocs/`

## Common Commands
````bash
yarn start     # Dev server with hot reload
yarn build     # Production build
yarn deploy    # Deploy to gh-pages branch
yarn typecheck # TypeScript validation
yarn serve     # Serve built site locally
yarn clear     # Clear build cache
````

## Project Structure
````
docs/          → Documentation (Markdown/MDX, auto-sidebar)
blog/          → Blog posts (YAML frontmatter)
src/
  pages/       → Custom routes (index.tsx = homepage)
  components/  → React components
  css/         → Theme customizations
static/        → Assets (images, favicon)
docusaurus.config.ts → Site configuration
sidebars.ts    → Sidebar structure (auto-generated)
````

## Key Configuration
- **Sidebar:** Auto-generated from `docs/` folder structure
- **Broken Links:** Build fails on broken links (`onBrokenLinks: 'throw'`)
- **MDX Support:** Available in docs and blog
- **Theme:** Infima CSS with light/dark mode
- **Edit URLs:** Currently points to template repo (update for production)
- **Future Compatibility:** `future.v4: true` enabled

## Common Tasks

**Add Documentation:** Place `.md`/`.mdx` files in `docs/` - sidebar updates automatically

**Add Blog Post:** Create file in `blog/` with frontmatter:
````yaml
---
date: YYYY-MM-DD
tags: [tag1, tag2]
authors: [author]
---
````

**Custom Pages:** Add React component to `src/pages/` (becomes route automatically)

**Style Overrides:** Edit `src/css/custom.css` (Infima variables)

## Additional Guidelines
See modular documentation:
- `coding_guidelines.md` - Code standards and patterns
- `writing_style.md` - Content and documentation style
- `analysis_framework.md` - Troubleshooting and debugging approach
