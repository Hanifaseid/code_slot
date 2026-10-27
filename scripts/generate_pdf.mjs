import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { marked } from 'marked';

const rootDir = process.cwd();
const mdPath = path.join(rootDir, 'PROJECT_DOCUMENTATION.md');
const outHtmlPath = path.join(rootDir, 'PROJECT_DOCUMENTATION.html');
const outPdfPath = path.join(rootDir, 'CodeSlot_System_Documentation.pdf');

if (!fs.existsSync(mdPath)) {
  console.error(`Error: ${mdPath} not found!`);
  process.exit(1);
}

const markdownContent = fs.readFileSync(mdPath, 'utf-8');

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
});

// Render markdown to HTML
let bodyHtml = marked.parse(markdownContent);

// Post-process HTML to add class hooks, handle callouts, and format diagrams
bodyHtml = bodyHtml
  // Handle alerts / blockquotes
  .replace(/<blockquote>\s*<p>\[!NOTE\]/g, '<div class="alert alert-note"><div class="alert-title">ℹ️ Note</div><p>')
  .replace(/<blockquote>\s*<p>\[!TIP\]/g, '<div class="alert alert-tip"><div class="alert-title">💡 Tip</div><p>')
  .replace(/<blockquote>\s*<p>\[!IMPORTANT\]/g, '<div class="alert alert-important"><div class="alert-title">⚡ Important</div><p>')
  .replace(/<blockquote>\s*<p>\[!WARNING\]/g, '<div class="alert alert-warning"><div class="alert-title">⚠️ Warning</div><p>')
  .replace(/<blockquote>/g, '<div class="custom-quote">')
  .replace(/<\/blockquote>/g, '</div>')
  // Mermaid code blocks
  .replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, p1) => {
    return `<div class="diagram-container"><div class="diagram-badge">System Architectural Diagram / Flow Model</div><pre class="mermaid-code">${p1.trim()}</pre></div>`;
  });

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CodeSlot: System Requirements Specification & Architecture Documentation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    :root {
      --primary: #1e3a8a;
      --primary-accent: #2563eb;
      --primary-light: #eff6ff;
      --text-main: #0f172a;
      --text-muted: #475569;
      --border: #cbd5e1;
      --border-light: #e2e8f0;
      --bg-subtle: #f8fafc;
      --code-bg: #0f172a;
      --code-text: #f1f5f9;
      --success-bg: #ecfdf5;
      --success-border: #10b981;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: var(--text-main);
      background: #ffffff;
      line-height: 1.6;
      font-size: 10.5pt;
      padding: 0;
    }

    /* Print Setup */
    @page {
      size: A4;
      margin: 20mm 16mm 22mm 16mm;
      @bottom-right {
        content: counter(page);
        font-size: 8.5pt;
        color: var(--text-muted);
      }
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .page-break-before {
        page-break-before: always;
      }
      .no-break {
        page-break-inside: avoid;
      }
      h2 {
        page-break-before: always;
      }
      h2:first-of-type {
        page-break-before: auto;
      }
      table, pre, .diagram-container, .alert {
        page-break-inside: avoid;
      }
    }

    /* Cover Page */
    .cover-page {
      page-break-after: always;
      height: 96vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px 20px;
      border: 3px double #1e3a8a;
      background: linear-gradient(180deg, #f8fafc 0%, #ffffff 60%, #eff6ff 100%);
      box-sizing: border-box;
    }

    .cover-header {
      border-bottom: 2px solid var(--primary-accent);
      padding-bottom: 24px;
    }

    .cover-org {
      font-size: 11pt;
      font-weight: 700;
      letter-spacing: 2px;
      color: var(--primary-accent);
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .cover-program {
      font-size: 13pt;
      font-weight: 600;
      color: var(--text-muted);
    }

    .cover-body {
      margin: 40px 0;
    }

    .cover-title {
      font-size: 26pt;
      font-weight: 800;
      color: var(--primary);
      line-height: 1.2;
      margin-bottom: 14px;
    }

    .cover-subtitle {
      font-size: 13pt;
      font-weight: 500;
      color: #334155;
      line-height: 1.5;
      max-width: 650px;
      margin-bottom: 30px;
    }

    .cover-badge-row {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }

    .badge {
      display: inline-block;
      padding: 6px 14px;
      background: #e0e7ff;
      color: #3730a3;
      border-radius: 9999px;
      font-size: 9pt;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    .badge.verified {
      background: #d1fae5;
      color: #065f46;
    }

    .cover-meta-card {
      background: #ffffff;
      border: 1px solid var(--border);
      border-left: 5px solid var(--primary-accent);
      border-radius: 8px;
      padding: 20px 24px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .cover-meta-grid {
      display: grid;
      grid-template-columns: 140px 1fr;
      row-gap: 10px;
      font-size: 10.5pt;
    }

    .meta-label {
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 9pt;
    }

    .meta-value {
      font-weight: 600;
      color: var(--text-main);
    }

    .cover-footer {
      border-top: 1px solid var(--border-light);
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9pt;
      color: var(--text-muted);
    }

    /* Document Body Typography */
    .document-body {
      padding: 10px 0;
    }

    h1, h2, h3, h4, h5, h6 {
      color: var(--primary);
      font-weight: 700;
      line-height: 1.3;
    }

    h1 {
      font-size: 20pt;
      margin: 20px 0 14px 0;
      border-bottom: 2px solid var(--primary-accent);
      padding-bottom: 8px;
    }

    h2 {
      font-size: 15pt;
      margin: 32px 0 12px 0;
      border-bottom: 1px solid var(--border);
      padding-bottom: 6px;
      color: var(--primary);
    }

    h3 {
      font-size: 12pt;
      margin: 22px 0 8px 0;
      color: #1e40af;
    }

    h4 {
      font-size: 11pt;
      margin: 16px 0 6px 0;
      color: #334155;
    }

    p {
      margin-bottom: 12px;
      color: #1e293b;
      text-align: justify;
    }

    ul, ol {
      margin: 10px 0 14px 22px;
      color: #1e293b;
    }

    li {
      margin-bottom: 5px;
    }

    strong {
      color: #0f172a;
      font-weight: 700;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0 22px 0;
      font-size: 9pt;
      background: #ffffff;
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
    }

    th {
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      text-align: left;
      padding: 9px 12px;
      border-bottom: 2px solid var(--border);
      font-size: 8.5pt;
      letter-spacing: 0.3px;
    }

    td {
      padding: 8px 12px;
      border-bottom: 1px solid var(--border-light);
      color: #334155;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background-color: #f8fafc;
    }

    /* Code Blocks */
    pre {
      background-color: var(--code-bg);
      color: var(--code-text);
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 8pt;
      padding: 14px 16px;
      border-radius: 6px;
      overflow-x: auto;
      margin: 14px 0 18px 0;
      line-height: 1.45;
      border: 1px solid #1e293b;
    }

    code {
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 8.5pt;
      background-color: #f1f5f9;
      color: #0f172a;
      padding: 2px 5px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }

    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
      border: none;
      font-size: 8pt;
    }

    /* Alerts and Blockquotes */
    .alert {
      padding: 12px 16px;
      border-radius: 6px;
      margin: 16px 0;
      border-left: 4px solid;
      background: #f8fafc;
      font-size: 9.5pt;
    }

    .alert-title {
      font-weight: 700;
      margin-bottom: 4px;
      font-size: 9.5pt;
    }

    .alert-note {
      background: #eff6ff;
      border-color: #3b82f6;
      color: #1e40af;
    }

    .alert-tip {
      background: #ecfdf5;
      border-color: #10b981;
      color: #065f46;
    }

    .alert-important {
      background: #fef2f2;
      border-color: #ef4444;
      color: #991b1b;
    }

    .alert-warning {
      background: #fffbeb;
      border-color: #f59e0b;
      color: #92400e;
    }

    .custom-quote {
      border-left: 3px solid #94a3b8;
      padding: 8px 16px;
      margin: 14px 0;
      font-style: italic;
      color: #475569;
      background: #f8fafc;
    }

    /* Diagrams */
    .diagram-container {
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 12px 16px;
      margin: 16px 0 20px 0;
    }

    .diagram-badge {
      font-size: 8pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--primary-accent);
      margin-bottom: 8px;
    }

    .mermaid-code {
      background: #ffffff;
      color: #1e293b;
      border: 1px solid var(--border-light);
      font-size: 7.5pt;
      padding: 10px;
      border-radius: 4px;
      white-space: pre-wrap;
      word-break: break-all;
    }

    hr {
      border: none;
      border-top: 1px solid var(--border-light);
      margin: 24px 0;
    }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="cover-page">
    <div class="cover-header">
      <div class="cover-org">Information Network Security Agency (INSA)</div>
      <div class="cover-program">Capstone Engineering Defense & Certification</div>
    </div>

    <div class="cover-body">
      <div class="cover-badge-row">
        <span class="badge verified">✓ Production Verified & Tested</span>
        <span class="badge">Full-Stack Monorepo</span>
        <span class="badge">Academic Year 2026</span>
      </div>

      <h1 class="cover-title">CodeSlot</h1>
      <p class="cover-subtitle">Enterprise Remote Tech Jobs Discovery Platform & AI Resume Studio Powered by Google Gemini 2.5 Flash</p>

      <div class="cover-meta-card">
        <div class="cover-meta-grid">
          <div class="meta-label">Project Title:</div>
          <div class="meta-value">CodeSlot System Requirements & Architecture Specification</div>

          <div class="meta-label">Student / Author:</div>
          <div class="meta-value"><strong>Hanifa Seid</strong></div>

          <div class="meta-label">Candidate ID:</div>
          <div class="meta-value"><strong>CTC-1646-26</strong></div>

          <div class="meta-label">Repository:</div>
          <div class="meta-value"><code>codeslot-monorepo</code></div>

          <div class="meta-label">Academic Program:</div>
          <div class="meta-value">INSA Final Capstone Project</div>

          <div class="meta-label">Document Version:</div>
          <div class="meta-value">v2.1.0 — Clean Technical Documentation</div>

          <div class="meta-label">Verification:</div>
          <div class="meta-value">30 / 30 Endpoints Passed (100% Automated Coverage)</div>
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <div>Official Technical Specification Document</div>
      <div>Confidential & Academic Submission © 2026 Hanifa Seid</div>
    </div>
  </div>

  <!-- Document Body -->
  <div class="document-body">
    ${bodyHtml}
  </div>

</body>
</html>
`;

fs.writeFileSync(outHtmlPath, fullHtml, 'utf-8');
console.log(`HTML generated at: ${outHtmlPath}`);

// Convert to PDF using Google Chrome headless
console.log('Rendering PDF via Chrome Headless...');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

if (!fs.existsSync(chromePath)) {
  console.error(`Chrome executable not found at: ${chromePath}`);
  process.exit(1);
}

const fileUrl = 'file:///' + outHtmlPath.replace(/\\/g, '/');

try {
  execFileSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    `--print-to-pdf=${outPdfPath}`,
    '--no-pdf-header-footer',
    fileUrl,
  ]);

  if (fs.existsSync(outPdfPath)) {
    const stats = fs.statSync(outPdfPath);
    console.log(`Success! PDF successfully generated: ${outPdfPath} (${stats.size} bytes)`);
  } else {
    console.error('Failed to create PDF file.');
    process.exit(1);
  }
} catch (err) {
  console.error('Error generating PDF with Chrome:', err.message);
  process.exit(1);
}
