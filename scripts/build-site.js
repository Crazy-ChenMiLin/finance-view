/**
 * Master Site Builder & Pipeline Orchestrator for GitLab Pages
 * Builds the complete static site for GitLab Pages with snapshots, diffs, and security sanitization.
 */

const fs = require('fs');
const path = require('path');
const { getRecentCommits, createCommitSnapshot } = require('./history-scanner');
const { computeArchitectureDiff } = require('./diff-calculator');
const { sanitizeAndVerifyDirectory } = require('./security-sanitizer');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DATA_DIR = path.join(DIST_DIR, 'data');
const SNAPSHOTS_DIR = path.join(DATA_DIR, 'snapshots');
const DIFFS_DIR = path.join(DATA_DIR, 'diffs');

// Repositories to scan
const SUB_REPO_CANDIDATES = [
  { name: 'finance-frontend', paths: ['D:/code-project/finance/finance-frontend', path.resolve(__dirname, '../../finance/finance-frontend'), path.resolve(__dirname, '../../finance-frontend')] },
  { name: 'sydo_oa_finance',  paths: ['D:/code-project/finance/sydo_oa_finance', path.resolve(__dirname, '../../finance/sydo_oa_finance'), path.resolve(__dirname, '../../sydo_oa_finance')] }
];

const SUB_REPOS = SUB_REPO_CANDIDATES.map(candidate => {
  for (const candidatePath of candidate.paths) {
    const resolved = path.resolve(candidatePath);
    if (fs.existsSync(resolved)) return resolved;
  }
  return path.resolve(`D:/code-project/finance/${candidate.name}`);
});

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function buildSite() {
  console.log('=== [1/6] Initializing build directories ===');
  [DIST_DIR, DATA_DIR, SNAPSHOTS_DIR, DIFFS_DIR, PUBLIC_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  console.log('=== [2/6] Copying UI templates & assets ===');
  ['index.html', 'style.css', 'app.js'].forEach(file => {
    const srcFile = path.join(SRC_DIR, file);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, path.join(DIST_DIR, file));
    }
  });

  console.log('=== [3/6] Scanning Git history across Finance subprojects ===');
  const allCommits = [];
  SUB_REPOS.forEach(repoPath => {
    if (fs.existsSync(repoPath)) {
      console.log(`Scanning commits in: ${repoPath}`);
      const commits = getRecentCommits(repoPath, 8);
      allCommits.push(...commits);
    } else {
      console.warn(`Sub-repo not found: ${repoPath}`);
    }
  });

  // Sort commits chronologically descending
  allCommits.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate snapshots for each representative commit
  const versions = [];
  const snapshots = [];

  if (allCommits.length > 0) {
    console.log(`=== [4/6] Archiving ${allCommits.length} architecture snapshots ===`);
    allCommits.forEach(c => {
      const repoPath = SUB_REPOS.find(r => path.basename(r) === c.repo);
      if (repoPath) {
        const snap = createCommitSnapshot(repoPath, c, SNAPSHOTS_DIR);
        snapshots.push(snap);
        versions.push({
          sha: snap.sha,
          shortSha: snap.shortSha,
          repo: snap.repo,
          date: snap.date,
          author: snap.author,
          message: snap.message
        });
      }
    });

    // Write versions index
    const versionsJson = JSON.stringify(versions, null, 2);
    fs.writeFileSync(path.join(DIST_DIR, 'versions.json'), versionsJson, 'utf8');
    fs.writeFileSync(path.join(DATA_DIR, 'versions.json'), versionsJson, 'utf8');

    // Pre-generate diffs between consecutive versions
    for (let i = 0; i < snapshots.length - 1; i++) {
      const targetSnap = snapshots[i];
      const baseSnap = snapshots[i + 1];
      const diff = computeArchitectureDiff(baseSnap, targetSnap);
      const diffPath = path.join(DIFFS_DIR, `${baseSnap.sha}-vs-${targetSnap.sha}.json`);
      fs.writeFileSync(diffPath, JSON.stringify(diff, null, 2), 'utf8');
    }
  } else {
    console.log('=== [4/6] No git commits found, using static architecture blueprint ===');
  }

  console.log('=== [5/6] Running Security & Sanitization Audit ===');
  sanitizeAndVerifyDirectory(DIST_DIR);

  console.log('=== [6/6] Syncing artifacts to public/ directory for GitLab Pages ===');
  copyRecursiveSync(DIST_DIR, PUBLIC_DIR);

  console.log('\n🚀 [BuildSite] Finance Living Architecture site build complete! Ready for GitLab Pages.');
}

if (require.main === module) {
  try {
    buildSite();
  } catch (err) {
    console.error(`[BuildSite] Build failed: ${err.message}`);
    process.exit(1);
  }
}

module.exports = {
  buildSite
};
