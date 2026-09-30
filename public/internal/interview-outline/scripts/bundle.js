#!/usr/bin/env node
/**
 * bundle.js
 * 一键将模块化的 CSS 和 JS 压回单文件 HTML (index.bundle.html)，
 * 保证与原单文件架构完全一致，方便离线备份与单文件独立分发。
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');
const OUTPUT_BUNDLE_PATH = path.join(ROOT_DIR, 'index.bundle.html');

function bundle() {
  console.log('📦 开始打包单文件 HTML 应用...');
  let html = fs.readFileSync(INDEX_HTML_PATH, 'utf-8');

  // 1. 内联 CSS
  const cssRegex = /<link\s+rel="stylesheet"\s+href="(\.\/css\/[^"]+)">/g;
  let combinedCss = '';
  html = html.replace(cssRegex, (match, href) => {
    const cssFile = path.join(ROOT_DIR, href);
    if (fs.existsSync(cssFile)) {
      console.log(`  ➕ 嵌入样式: ${href}`);
      combinedCss += `\n/* === ${href} === */\n` + fs.readFileSync(cssFile, 'utf-8');
      return '';
    }
    return match;
  });

  html = html.replace('</head>', `<style>${combinedCss}\n</style>\n</head>`);

  // 2. 内联本地 JS
  const jsRegex = /<script\s+src="(\.\/js\/[^"]+)"><\/script>/g;
  let combinedJs = '';
  html = html.replace(jsRegex, (match, src) => {
    const jsFile = path.join(ROOT_DIR, src);
    if (fs.existsSync(jsFile)) {
      console.log(`  ➕ 嵌入脚本: ${src}`);
      combinedJs += `\n// === ${src} ===\n` + fs.readFileSync(jsFile, 'utf-8');
      return '';
    }
    return match;
  });

  html = html.replace('</body>', `<script>${combinedJs}\n</script>\n</body>`);

  fs.writeFileSync(OUTPUT_BUNDLE_PATH, html, 'utf-8');
  const sizeKb = (fs.statSync(OUTPUT_BUNDLE_PATH).size / 1024).toFixed(1);
  console.log(`✅ 单文件打包完成: ${OUTPUT_BUNDLE_PATH} (${sizeKb} KB)`);
}

bundle();
