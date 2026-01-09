# Coding Guidelines

## TypeScript Standards
- Use strict TypeScript - avoid `any` types
- Define interfaces for component props
- Use type inference where obvious
- Export types from component files when reused

## React/Docusaurus Patterns

### Component Structure
````tsx
import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface MyComponentProps {
  title: string;
  optional?: boolean;
}

export default function MyComponent({ 
  title, 
  optional = false 
}: MyComponentProps): JSX.Element {
  return (
    <div className={clsx(styles.container)}>
      <h2>{title}</h2>
    </div>
  );
}
````

### Styling Approach
- **Primary:** CSS Modules (`styles.module.css`) for component styles
- **Global:** `src/css/custom.css` for theme variables and overrides
- **Utility:** Use `clsx` for conditional classes
- **Theme Variables:** Prefer CSS custom properties from Infima

### File Naming
- Components: PascalCase folders with `index.tsx` and `styles.module.css`
- Pages: kebab-case or lowercase (`src/pages/my-page.tsx` → `/my-page`)
- Docs: kebab-case Markdown (`docs/getting-started.md`)

## Docusaurus-Specific

### MDX Components
When creating reusable MDX components:
````tsx
// src/components/Highlight.tsx
export default function Highlight({children, color}) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}
````

Use in MDX:
````mdx
import Highlight from '@site/src/components/Highlight';

<Highlight color="#25c2a0">Important text</Highlight>
````

### Configuration Changes
When modifying `docusaurus.config.ts`:
- Always run `yarn typecheck` after changes
- Test both dev (`yarn start`) and production build (`yarn build`)
- Verify GitHub Pages deployment settings if changing `baseUrl` or `url`

### Plugin Development
If adding custom plugins:
- Place in `src/plugins/`
- Follow Docusaurus plugin lifecycle hooks
- Document plugin purpose and configuration in comments

## Git Workflow
- Branch naming: `feature/description` or `fix/description`
- Commit messages: Clear, imperative mood ("Add feature" not "Added feature")
- Before commit: Run `yarn typecheck` and `yarn build`

## Performance Considerations
- Lazy load heavy components with `React.lazy()`
- Optimize images in `static/` (use WebP where possible)
- Minimize custom CSS - leverage Infima utilities
- Check bundle size impact of new dependencies

## Error Handling
- Wrap async operations in try-catch
- Provide fallback UI for loading states
- Handle 404s gracefully (Docusaurus does this by default)
- Display user-friendly error messages

## Testing Approach
- Manually test in both light and dark modes
- Verify responsive behavior (mobile, tablet, desktop)
- Check all navigation links after adding/moving docs
- Test production build locally before deploying (`yarn build && yarn serve`)

## Common Patterns

### Custom Hooks
````tsx
import { useEffect, useState } from 'react';

export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
````

### Layout Components
````tsx
import React from 'react';
import Layout from '@theme/Layout';

export default function CustomPage(): JSX.Element {
  return (
    <Layout
      title="Custom Page Title"
      description="Page description for SEO">
      <main>
        {/* Your content */}
      </main>
    </Layout>
  );
}
````

## Dependencies
- Keep dependencies minimal and well-maintained
- Check npm package health before adding (downloads, last update, issues)
- Prefer Docusaurus-compatible packages
- Document why each dependency is needed
