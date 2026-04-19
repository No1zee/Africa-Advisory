/**
 * AFRICA ADVISORY INTELLIGENCE SYNC
 * Direct connection bridge to the 'Control-Tower' Obsidian Vault.
 * This script bypasses the MCP layer for maximum stability and supports bi-directional sync.
 */

import fs from 'fs';
import path from 'path';
import 'dotenv/config';

const OBSIDIAN_CONFIG = {
  baseUrl: process.env.OBSIDIAN_BASE_URL || 'http://127.0.0.1:27123',
  apiKey: process.env.OBSIDIAN_API_KEY,
  projectNote: 'Project: Africa Advisory.md',
  manifestNote: 'Intelligence Manifest.md'
};

const PROJECT_CONTEXT = {
  title: 'Africa Advisory',
  status: 'In Development / Final UI Polish',
  branding: {
    primary: '#00B4A6',
    palette: 'Teal, Deep Charcoal, Parchment',
    typography: 'Instrument Serif, Work Sans'
  },
  mission: 'Establishing a direct architectural bridge between global capital and African sovereign mandates.',
  currentFocus: 'Cinematic Branding Finalization and Institutional Knowledge Sync.'
};

const LOCAL_DATA_PATH = path.join(process.cwd(), 'src', 'data', 'intelligence.json');

async function syncToObsidian() {
  console.log('[DirectBridge] Starting Outbound Intelligence Sync...');

  const content = `---
title: ${PROJECT_CONTEXT.title}
status: ${PROJECT_CONTEXT.status}
sync_date: ${new Date().toISOString()}
primary_accent: "${PROJECT_CONTEXT.branding.primary}"
---

# ${PROJECT_CONTEXT.title} | Institutional Intelligence

## Project Identity
- **Mission**: ${PROJECT_CONTEXT.mission}
- **Branding**: ${PROJECT_CONTEXT.branding.palette}
- **Typography**: ${PROJECT_CONTEXT.branding.typography}

## Current Development State
${PROJECT_CONTEXT.currentFocus}

---

## Architectural Tokens
- **Base Obsidian**: \`#121417\` (70%)
- **Secondary Parchment**: \`#F2EDE3\` (20%)
- **Primary Teal**: \`#00B4A6\` (10%)

---

## Deployment Parameters
- **Engine**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS + Vanilla CSS (Direct)
- **Bridge**: Direct Antigravity Intelligence Sync (Port 27123)

---

> [!IMPORTANT]
> This note is managed by Antigravity. Direct edits may be overwritten during automated sync cycles.
`;

  try {
    const response = await fetch(`${OBSIDIAN_CONFIG.baseUrl}/vault/${encodeURIComponent(OBSIDIAN_CONFIG.projectNote)}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${OBSIDIAN_CONFIG.apiKey}`,
        'Content-Type': 'text/markdown'
      },
      body: content
    });

    if (response.ok) {
      console.log(`[DirectBridge] Outbound Sync Successful: ${OBSIDIAN_CONFIG.projectNote} updated.`);
    } else {
      console.error(`[DirectBridge] Outbound Sync Failed: ${response.status}`);
    }
  } catch (error) {
    console.error(`[DirectBridge] Outbound Transition Error:`, error.message);
  }
}

async function fetchFromObsidian() {
  console.log('[DirectBridge] Starting Inbound Intelligence Fetch...');

  try {
    const response = await fetch(`${OBSIDIAN_CONFIG.baseUrl}/vault/${encodeURIComponent(OBSIDIAN_CONFIG.manifestNote)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${OBSIDIAN_CONFIG.apiKey}`,
        'Accept': 'text/markdown'
      }
    });

    if (!response.ok) {
      console.warn(`[DirectBridge] Manifest not found or inaccessible (${response.status}). Using fallback defaults.`);
      return;
    }

    const markdown = await response.text();
    const data = parseManifest(markdown);
    
    // Ensure directory exists
    const dir = path.dirname(LOCAL_DATA_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(LOCAL_DATA_PATH, JSON.stringify(data, null, 2));
    console.log(`[DirectBridge] Inbound Sync Successful: ${LOCAL_DATA_PATH} updated.`);
  } catch (error) {
    console.error(`[DirectBridge] Inbound Transition Error:`, error.message);
  }
}

function parseManifest(md) {
  const result = {
    tickerStats: [],
    mandates: []
  };

  // Simple regex parsing for the manifest format
  const tickerSection = md.match(/## Ticker Stats([\s\S]*?)(##|$)/);
  if (tickerSection) {
    const lines = tickerSection[1].split('\n');
    lines.forEach(line => {
      const match = line.match(/-\s*(.*?):\s*(.*)/);
      if (match) result.tickerStats.push({ label: match[1].trim(), value: match[2].trim() });
    });
  }

  const mandateSection = md.match(/## Portfolio Mandates([\s\S]*?)(##|$)/);
  if (mandateSection) {
    const lines = mandateSection[1].split('\n');
    lines.forEach(line => {
      const match = line.match(/-\s*(.*?):\s*(.*)/);
      if (match) result.mandates.push({ label: match[1].trim(), value: match[2].trim() });
    });
  }

  return result;
}

// Orchestration
async function run() {
  await syncToObsidian();
  await fetchFromObsidian();
}

run();
