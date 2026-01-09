# Writing Style Guide

## Documentation Principles
- **Clarity over cleverness** - Be direct and unambiguous
- **Show, don't just tell** - Include code examples
- **Progressive disclosure** - Start simple, layer complexity
- **Scannable structure** - Use headings, lists, and code blocks

## Markdown/MDX Conventions

### Frontmatter Standards
````yaml
---
id: unique-id           # Optional: defaults to filename
title: Page Title       # Required: Shows in sidebar and <title>
sidebar_label: Short    # Optional: Shorter sidebar text
sidebar_position: 1     # Optional: Manual ordering (lower = higher)
description: SEO desc   # Optional: Meta description
keywords: [key, words]  # Optional: SEO keywords
---
````

### Heading Hierarchy
- H1 (`#`) - Page title (auto-generated from frontmatter, don't repeat)
- H2 (`##`) - Major sections
- H3 (`###`) - Subsections
- Avoid H4+ unless absolutely necessary

### Code Examples
Always specify language for syntax highlighting:
````markdown
```javascript
const example = 'Use language identifiers';
```
````

Common languages: `javascript`, `typescript`, `tsx`, `bash`, `json`, `yaml`, `css`, `markdown`

### Admonitions (Callouts)
Use Docusaurus admonitions for important information:
````markdown
:::note
Standard information or context
:::

:::tip
Helpful suggestions and best practices
:::

:::warning
Important caveats or things to watch out for
:::

:::danger
Critical warnings about breaking changes or data loss
:::

:::info
Additional context or background information
:::
````

### Links
- **Internal docs:** Use relative paths: `[Getting Started](./getting-started.md)`
- **Internal pages:** Use absolute paths: `[Homepage](/)`
- **External:** Docusaurus auto-adds `target="_blank"` for external sites
- **Anchor links:** `[Section](#section-heading)` (heading text, lowercase, hyphens)

### Images
````markdown
![Alt text describing the image](/img/screenshot.png)
````
- Place images in `static/img/`
- Use descriptive alt text for accessibility
- Optimize file sizes before adding (compress, use WebP)
- Reference with `/img/` path (not `../static/img/`)

## Content Structure

### Tutorials
1. **Prerequisites** - What reader needs to know/have installed
2. **Goal statement** - What they'll accomplish by the end
3. **Step-by-step** - Numbered steps with code examples
4. **Verification** - How to confirm success
5. **Next steps** - Related resources or what to learn next

Example:
````markdown
## Prerequisites
- Node.js 20 or higher installed
- Basic familiarity with command line

## What You'll Build
A custom Docusaurus plugin that adds reading time to blog posts.

## Steps

### 1. Create Plugin File
...

### 2. Configure Plugin
...

## Verify It Works
Run `yarn start` and check that reading time appears on blog posts.

## Next Steps
- Learn about [advanced plugin options](./advanced-plugins.md)
- Explore [other plugin examples](./plugin-examples.md)
````

### Reference Documentation
- **Concise descriptions** - One sentence summary at top
- **Parameters/Props** - Table format for easy scanning
- **Return values** - Clear type information
- **Examples** - Minimum viable example that runs

Example:
````markdown
## Component Name

Brief description of what the component does.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | required | The heading text |
| variant | 'primary' \| 'secondary' | 'primary' | Visual style |

### Example

\```tsx
<ComponentName title="Hello" variant="secondary" />
\```
````

### Guides (How-To)
- **Context** - Why this approach matters
- **Comparison** - When to use vs. alternatives
- **Implementation** - How to apply with examples
- **Gotchas** - Common pitfalls and how to avoid them

## Tone and Voice
- **Professional but approachable** - Avoid overly formal or casual
- **Active voice** - "Click the button" not "The button should be clicked"
- **Second person** - Address reader as "you"
- **Present tense** - "The function returns" not "will return"
- **Avoid jargon** - Explain technical terms on first use

## Terminology Consistency
Maintain consistent terms throughout docs:
- "GitHub Pages" not "Github pages" or "GH Pages"
- "Docusaurus" not "docusaurus" (except in code)
- "Markdown" and "MDX" (capitalized)
- "homepage" not "home page" or "landing page"
- "sidebar" not "side bar"
- "repository" not "repo" in formal docs (repo OK in casual context)

## Blog Posts
Additional requirements for `blog/`:
````yaml
---
slug: url-slug
title: Post Title
authors: [author-key]  # Defined in blog/authors.yml
tags: [docusaurus, tutorial]
date: 2024-01-15
---
````

Use `<!--truncate-->` to mark excerpt end for list view.

**Blog-specific style:**
- More conversational tone acceptable
- Can use first person ("I", "we")
- Include publication date prominently
- Tag appropriately for discoverability

## Accessibility Guidelines
- Provide descriptive alt text for all images
- Use semantic heading hierarchy (no skipping levels: H2 → H4)
- Ensure code examples have proper language tags for screen readers
- Test color contrast in both light/dark modes
- Write descriptive link text (not "click here")

## Content Review Checklist
Before publishing documentation:
- [ ] All code examples tested and working
- [ ] Links verified (internal and external)
- [ ] Images optimized and have alt text
- [ ] Headings follow proper hierarchy
- [ ] Terminology is consistent
- [ ] Spelling and grammar checked
- [ ] Renders correctly in both light and dark modes
- [ ] Mobile-responsive layout verified
