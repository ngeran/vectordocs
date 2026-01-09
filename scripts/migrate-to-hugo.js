#!/usr/bin/env node

/**
 * Docusaurus to Hugo Migration Script
 *
 * This script copies and converts Docusaurus content back to Hugo format.
 * Original Docusaurus files are NOT modified - only copied and transformed.
 *
 * Usage: node scripts/migrate-to-hugo.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DOCUSAURUS_DOCS_DIR = path.join(__dirname, '../docs');
const DOCUSAURUS_STATIC_DIR = path.join(__dirname, '../static/img/migrated');
const HUGO_CONTENT_DIR = '/home/nikos/github/ngeran/ngeranio/content-export';

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

/**
 * Convert YAML frontmatter to TOML frontmatter
 */
function convertFrontmatterToTOML(yamlContent) {
  const frontmatterRegex = /^---([\s\S]*?)---/;
  const match = yamlContent.match(frontmatterRegex);

  if (!match) {
    // If no frontmatter, add basic TOML frontmatter
    return `+++
title = 'Untitled'
date = ${new Date().toISOString()}
draft = false
+++

${yamlContent}`;
  }

  const yamlData = match[1];
  const content = yamlContent.replace(frontmatterRegex, '').trim();

  // Parse YAML-like data (simple implementation)
  const metadata = {};
  const lines = yamlData.split('\n');

  let currentKey = null;
  let inArray = false;

  lines.forEach(line => {
    const trimmedLine = line.trim();

    // Skip comments and empty lines
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      return;
    }

    // Array items
    if (trimmedLine.startsWith('- ')) {
      if (currentKey && !metadata[currentKey]) {
        metadata[currentKey] = [];
      }
      if (Array.isArray(metadata[currentKey])) {
        metadata[currentKey].push(trimmedLine.slice(2).replace(/^['"]|['"]$/g, ''));
      }
      inArray = true;
      return;
    }

    // Key-value pairs
    const keyValueMatch = trimmedLine.match(/^(\w+):\s*(.*)$/);
    if (keyValueMatch) {
      const [, key, value] = keyValueMatch;
      currentKey = key;
      let cleanedValue = value.trim().replace(/^['"]|['"]$/g, '');

      // Handle boolean values
      if (cleanedValue === 'true') cleanedValue = true;
      if (cleanedValue === 'false') cleanedValue = false;

      metadata[key] = cleanedValue;
      inArray = false;
    }
  });

  // Convert to TOML
  let toml = '+++\n';
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value)) {
      const arrayStr = value.map(v => `"${v}"`).join(', ');
      toml += `${key} = [${arrayStr}]\n`;
    } else if (typeof value === 'boolean') {
      toml += `${key} = ${value ? 'true' : 'false'}\n`;
    } else if (typeof value === 'string' && value.includes(':')) {
      // Looks like a date or contains special characters
      toml += `${key} = '${value}'\n`;
    } else {
      toml += `${key} = '${value}'\n`;
    }
  }
  toml += '+++\n\n';

  return toml + content;
}

/**
 * Update image references back to relative paths
 */
function updateImageReferencesBack(content, docPath) {
  // Replace static/img/migrated paths with relative paths
  return content.replace(
    /!\[([^\]]*)\]\(\/img\/migrated\/([^)]+)\)/g,
    (match, alt, imagePath) => {
      // Convert to relative path
      const filename = path.basename(imagePath);
      return `![${alt}](${filename})`;
    }
  );
}

/**
 * Process a markdown file
 */
function processMarkdownFile(sourcePath, targetPath) {
  console.log(`Processing: ${sourcePath}`);

  let content = fs.readFileSync(sourcePath, 'utf-8');

  // Convert frontmatter
  content = convertFrontmatterToTOML(content);

  // Update image references
  content = updateImageReferencesBack(content, sourcePath);

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
 * Copy image files back to Hugo structure
 */
function copyImageBackToHugo(imagePath, targetDir) {
  const filename = path.basename(imagePath);
  const targetPath = path.join(targetDir, filename);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.copyFileSync(imagePath, targetPath);
  console.log(`  → Copied image: ${targetPath}`);
}

/**
 * Process Docusaurus docs directory
 */
function processDocsDirectory(sourceDir, targetDir) {
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      // Skip hidden directories
      if (entry.name.startsWith('.')) {
        continue;
      }

      // Process subdirectory
      processDocsDirectory(sourcePath, targetPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);

      // Handle markdown files
      if (ext === '.md' || ext === '.mdx') {
        // Convert to Hugo index.md if it's a directory name.md
        let targetFileName = entry.name;

        processMarkdownFile(sourcePath, targetPath);
      }
    }
  }
}

/**
 * Copy migrated images back to Hugo
 */
function copyImagesToHugo() {
  if (!fs.existsSync(DOCUSAURUS_STATIC_DIR)) {
    console.log('No migrated images found.');
    return;
  }

  console.log('\n🖼️  Copying images back to Hugo structure...');

  function copyDirectory(sourceDir, targetDir) {
    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
      const sourcePath = path.join(sourceDir, entry.name);
      const targetPath = path.join(targetDir, entry.name);

      if (entry.isDirectory()) {
        copyDirectory(sourcePath, targetPath);
      } else if (entry.isFile() && IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
        copyImageBackToHugo(sourcePath, targetDir);
      }
    }
  }

  copyDirectory(DOCUSAURUS_STATIC_DIR, HUGO_CONTENT_DIR);
}

/**
 * Main reverse migration function
 */
function main() {
  console.log('🔄 Starting Docusaurus to Hugo migration...\n');

  // Create export directory
  if (!fs.existsSync(HUGO_CONTENT_DIR)) {
    fs.mkdirSync(HUGO_CONTENT_DIR, { recursive: true });
  }

  // Process Docusaurus docs
  console.log('📄 Processing Docusaurus docs...');
  processDocsDirectory(DOCUSAURUS_DOCS_DIR, HUGO_CONTENT_DIR);

  // Copy images
  copyImagesToHugo();

  console.log('\n✅ Reverse migration complete!\n');
  console.log('📝 Next steps:');
  console.log(`   1. Review exported content in: ${HUGO_CONTENT_DIR}`);
  console.log('   2. Manually copy to your Hugo content/ directory');
  console.log('   3. Verify image references are correct');
  console.log('   4. Test in your Hugo site\n');
}

// Run reverse migration
main();
