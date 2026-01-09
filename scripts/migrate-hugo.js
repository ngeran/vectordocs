#!/usr/bin/env node

/**
 * Hugo to Docusaurus Migration Script
 *
 * This script copies and converts Hugo content to Docusaurus format.
 * Original Hugo files are NOT modified - only copied and transformed.
 *
 * Usage: node scripts/migrate-hugo.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const HUGO_CONTENT_DIR = '/home/nikos/github/ngeran/ngeranio/content';
const DOCUSAURUS_DOCS_DIR = path.join(__dirname, '../docs');
const DOCUSAURUS_STATIC_DIR = path.join(__dirname, '../static/img/migrated');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

/**
 * Convert TOML frontmatter to YAML frontmatter
 */
function convertFrontmatter(tomlContent) {
  const frontmatterRegex = /^\+\+\+([\s\S]*?)\+\+\+/;
  const match = tomlContent.match(frontmatterRegex);

  if (!match) {
    return tomlContent;
  }

  const tomlData = match[1];
  const content = tomlContent.replace(frontmatterRegex, '').trim();

  // Parse TOML-like data (simple implementation)
  const metadata = {};
  const lines = tomlData.split('\n');

  lines.forEach(line => {
    const keyValueMatch = line.match(/^(\w+)\s*=\s*(.*)$/);
    if (keyValueMatch) {
      const [, key, value] = keyValueMatch;
      // Remove quotes and convert
      let cleanedValue = value.trim().replace(/^['"]|['"]$/g, '');

      // Handle arrays
      if (cleanedValue.startsWith('[') && cleanedValue.endsWith(']')) {
        cleanedValue = cleanedValue
          .slice(1, -1)
          .split(',')
          .map(v => v.trim().replace(/^['"]|['"]$/g, ''))
          .filter(v => v);
      }

      metadata[key] = cleanedValue;
    }
  });

  // Convert to YAML
  let yaml = '---\n';
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value)) {
      yaml += `${key}:\n`;
      value.forEach(v => {
        yaml += `  - ${v}\n`;
      });
    } else if (typeof value === 'boolean') {
      yaml += `${key}: ${value ? 'true' : 'false'}\n`;
    } else {
      yaml += `${key}: ${value}\n`;
    }
  }
  yaml += '---\n\n';

  return yaml + content;
}

/**
 * Clean up malformed HTML in markdown content
 */
function cleanupHTML(content) {
  // Remove all blockquote tags (opening and closing)
  content = content.replace(/<\/?blockquote[^>]*>[\r\n]*/gi, '\n');

  // Convert <pre><code> blocks to markdown code blocks
  content = content.replace(/<pre[^>]*>\s*<code([^>]*)>([\s\S]*?)<\/code>\s*<\/pre>/gi, (match, attrs, code) => {
    // Determine if it has a language class
    const langMatch = attrs.match(/class="[^"]*language-(\w+)/);
    const lang = langMatch ? langMatch[1] : '';
    return `\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n`;
  });

  // Fix self-closing br tags
  content = content.replace(/<br\s*\/?>/gi, '\n');

  // Fix common HTML issues
  content = content.replace(/<\/li>([\s\n]*<br\s*\/>)/gi, '</li>$1');

  // Remove empty paragraph tags
  content = content.replace(/<p><\/p>/gi, '');

  return content;
}

/**
 * Update image references in markdown content
 */
function updateImageReferences(content, relativePath) {
  // Replace relative image references with static/img/migrated path
  return content.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    (match, alt, imagePath) => {
      // If it's already an absolute path or external URL, leave it
      if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
        return match;
      }

      // Convert relative path to static path
      const newPath = `/img/migrated/${relativePath}/${path.basename(imagePath)}`;
      return `![${alt}](${newPath})`;
    }
  );
}

/**
 * Get the directory path for image references
 */
function getImageDirectory(relativePath) {
  // Remove the filename extension if present
  const parts = relativePath.split('/');
  const lastPart = parts[parts.length - 1];

  // If the last part ends with .md, remove it and get parent directory
  if (lastPart && lastPart.match(/.*\.md$/)) {
    return parts.slice(0, -1).join('/');
  }

  return relativePath;
}

/**
 * Process a markdown file
 */
function processMarkdownFile(sourcePath, targetPath, relativePath, isIndexFile = false) {
  console.log(`Processing: ${sourcePath}`);

  let content = fs.readFileSync(sourcePath, 'utf-8');

  // Convert frontmatter
  content = convertFrontmatter(content);

  // Add slug for index files to make them work with Docusaurus
  if (isIndexFile) {
    // Inject slug into frontmatter
    content = content.replace(/^---\n/, `---\nslug: /${relativePath.replace(/\/index\.md$/, '').replace(/\/_index\.md$/, '')}\n`);
  }

  // Clean up malformed HTML
  content = cleanupHTML(content);

  // Update image references - use directory path for images
  const imageDir = getImageDirectory(relativePath);
  content = updateImageReferences(content, imageDir);

  // Ensure target directory exists
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Write converted content
  fs.writeFileSync(targetPath, content, 'utf-8');
  console.log(`  → Created: ${targetPath}`);
}

/**
 * Copy image files
 */
function copyImageFile(sourcePath, targetPath) {
  const targetDir = path.dirname(targetPath);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.copyFileSync(sourcePath, targetPath);
  console.log(`  → Copied image: ${targetPath}`);
}

/**
 * Process a directory recursively
 */
function processDirectory(sourceDir, targetDir, relativePath = '') {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const entryRelativePath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      // Skip hidden directories
      if (entry.name.startsWith('.')) {
        continue;
      }

      // Process subdirectory
      const newTargetDir = path.join(targetDir, entry.name);
      processDirectory(sourcePath, newTargetDir, entryRelativePath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);

      // Handle markdown files
      if (ext === '.md') {
        // Convert index.md and _index.md to proper names
        let targetFileName = entry.name;
        if (entry.name === 'index.md' || entry.name === '_index.md') {
          // For Hugo, _index.md marks a directory index
          // For Docusaurus, we keep it as index.md or use category metadata
          targetFileName = 'index.md';
        }

        const targetPath = path.join(targetDir, targetFileName);

        // Skip _index files from sidebar if they're just category placeholders
        const isIndexFile = entry.name === '_index.md' || entry.name === 'index.md';

        processMarkdownFile(sourcePath, targetPath, entryRelativePath, isIndexFile);
      }
      // Handle image files
      else if (IMAGE_EXTENSIONS.includes(ext.toLowerCase())) {
        const targetPath = path.join(DOCUSAURUS_STATIC_DIR, entryRelativePath);
        copyImageFile(sourcePath, targetPath);
      }
    }
  }
}

/**
 * Generate sidebar configuration
 */
function generateSidebarConfig() {
  const sidebarItems = [];

  function scanDirectory(dir, basePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const items = [];
    for (const entry of entries) {
      // Skip hidden files, category configs, and index files
      if (entry.name.startsWith('.') || entry.name === '_category_.yml' || entry.name === 'index.md') {
        continue;
      }

      const fullPath = path.join(dir, entry.name);
      const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        const subItems = scanDirectory(fullPath, relativePath);
        if (subItems.length > 0) {
          items.push({
            type: 'category',
            label: formatLabel(entry.name),
            items: subItems,
          });
        }
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const id = entry.name.replace(/\.md$/, '');
        items.push({
          type: 'doc',
          id: relativePath.replace(/\.md$/, ''),
          label: formatLabel(id),
        });
      }
    }

    return items;
  }

  const items = scanDirectory(DOCUSAURUS_DOCS_DIR);

  return {
    tutorialSidebar: [
      {
        type: 'category',
        label: 'Posts',
        items: items,
      },
    ],
  };
}

/**
 * Format label from filename
 */
function formatLabel(name) {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim();
}

/**
 * Main migration function
 */
function main() {
  console.log('🚀 Starting Hugo to Docusaurus migration...\n');

  // Clean previous migration
  if (fs.existsSync(DOCUSAURUS_DOCS_DIR)) {
    console.log('🗑️  Cleaning previous docs migration...');
    fs.rmSync(DOCUSAURUS_DOCS_DIR, { recursive: true, force: true });
  }

  if (fs.existsSync(DOCUSAURUS_STATIC_DIR)) {
    console.log('🗑️  Cleaning previous image migration...');
    fs.rmSync(DOCUSAURUS_STATIC_DIR, { recursive: true, force: true });
  }

  // Create directories
  fs.mkdirSync(DOCUSAURUS_DOCS_DIR, { recursive: true });
  fs.mkdirSync(DOCUSAURUS_STATIC_DIR, { recursive: true });

  // Process Hugo content
  console.log('\n📄 Processing Hugo content...');
  processDirectory(HUGO_CONTENT_DIR, DOCUSAURUS_DOCS_DIR);

  // Generate sidebar config
  console.log('\n📋 Generating sidebar configuration...');
  const sidebarConfig = generateSidebarConfig();
  const sidebarPath = path.join(__dirname, '../sidebars-generated.ts');
  const sidebarContent = `/**
 * Auto-generated sidebar configuration from Hugo content
 * Generated by: scripts/migrate-hugo.js
 */

export default ${JSON.stringify(sidebarConfig, null, 2)};
`;

  fs.writeFileSync(sidebarPath, sidebarContent, 'utf-8');
  console.log(`✅ Sidebar config created: ${sidebarPath}\n`);

  console.log('✅ Migration complete!\n');
  console.log('📝 Next steps:');
  console.log('   1. Review the migrated content in the docs/ directory');
  console.log('   2. Update docusaurus.config.ts to use sidebars-generated.ts');
  console.log('   3. Run: yarn start to preview the migrated content');
  console.log('   4. Customize the sidebar structure as needed\n');
}

// Run migration
main();
