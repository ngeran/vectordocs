# Hugo ↔ Docusaurus Migration Scripts

These scripts help migrate content between Hugo and Docusaurus formats without modifying the original files.

## Features

- **Non-destructive**: Original Hugo/Docusaurus files are never modified
- **Preserves structure**: Maintains directory hierarchy and organization
- **Image handling**: Automatically copies and updates image references
- **Frontmatter conversion**: Converts between TOML (Hugo) and YAML (Docusaurus)
- **Sidebar generation**: Auto-generates Docusaurus sidebar configuration

## Usage

### Migrate Hugo → Docusaurus

```bash
yarn migrate:hugo
```

This will:
1. Copy all content from `/home/nikos/github/ngeran/ngeranio/content`
2. Convert TOML frontmatter to YAML
3. Update image references to work with Docusaurus static files
4. Copy images to `static/img/migrated/`
5. Generate `sidebars-generated.ts` configuration
6. Place everything in the `docs/` directory

### Migrate Docusaurus → Hugo

```bash
yarn migrate:to-hugo
```

This will:
1. Copy all content from `docs/`
2. Convert YAML frontmatter to TOML
3. Update image references back to relative paths
4. Export to `/home/nikos/github/ngeran/ngeranio/content-export`

## Post-Migration Steps

### After Hugo → Docusaurus Migration

1. **Review the migrated content** in `docs/`
2. **Update docusaurus.config.ts** to use the generated sidebar:

   ```typescript
   // In docusaurus.config.ts
   presets: [
     [
       'classic',
       {
         docs: {
           sidebarPath: './sidebars-generated.ts', // Change this
           // ...
         },
       },
     ],
   ],
   ```

3. **Rename "Tutorial" to "Posts"** in the navbar config:

   ```typescript
   navbar: {
     items: [
       {
         type: 'docSidebar',
         sidebarId: 'tutorialSidebar',
         position: 'left',
         label: 'Posts', // Changed from 'Tutorial'
       },
     ],
   },
   ```

4. **Preview the site**:

   ```bash
   yarn start
   ```

5. **Customize** the sidebar structure in `sidebars-generated.ts` as needed

### After Docusaurus → Hugo Migration

1. **Review exported content** in `/home/nikos/github/ngeran/ngeranio/content-export`
2. **Manually copy** to your Hugo `content/` directory
3. **Verify image references** are correct
4. **Test in your Hugo site**

## Migration Details

### Frontmatter Conversion

**Hugo (TOML):**
```toml
+++
title = 'Post Title'
date = 2024-12-17T16:04:48-05:00
draft = false
tags = ["BGP", "Routing"]
+++
```

**Docusaurus (YAML):**
```yaml
---
title: Post Title
date: 2024-12-17T16:04:48-05:00
draft: false
tags:
  - BGP
  - Routing
---
```

### Image Path Conversion

**Hugo structure:**
```
content/
  routing/
    bgp/
      as_path.md
      diagram.png
```

**Docusaurus structure:**
```
docs/
  routing/
    bgp/
      as_path.md
static/
  img/
    migrated/
      routing/
        bgp/
          diagram.png
```

Image references are automatically updated:
- Hugo: `![Diagram](diagram.png)`
- Docusaurus: `![Diagram](/img/migrated/routing/bgp/diagram.png)`

## Customization

You can customize the migration behavior by editing the configuration at the top of each script:

```javascript
// In migrate-hugo.js
const HUGO_CONTENT_DIR = '/path/to/hugo/content';
const DOCUSAURUS_DOCS_DIR = path.join(__dirname, '../docs');
const DOCUSAURUS_STATIC_DIR = path.join(__dirname, '../static/img/migrated');
```

## Troubleshooting

### Issue: Images not showing after migration

**Solution**: Check that images were copied to `static/img/migrated/` and paths are correct.

### Issue: Sidebar not generating correctly

**Solution**: Manually edit `sidebars-generated.ts` to customize the structure.

### Issue: Frontmatter not converting properly

**Solution**: The scripts use simple parsers. Complex frontmatter may need manual adjustment.

## Safety

- **Original files are never modified**
- **Migration creates new files only**
- **You can always re-run the migration**
- **Export directories are cleaned before each migration**
