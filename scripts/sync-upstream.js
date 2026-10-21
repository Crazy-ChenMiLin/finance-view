/**
 * Upstream Sync & Incremental Commit Detector
 * Checks upstream Git hosting repositories for new commits.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const UPSTREAM_REPOS = [
  { name: 'finance-frontend', url: 'http://47.108.83.49:3000/bitcq/finance-frontend.git', localPath: path.resolve(__dirname, '../../finance/finance-frontend') },
  { name: 'sydo_oa_finance', url: 'http://47.108.83.49:3000/bitcq/sydo_oa_finance.git', localPath: path.resolve(__dirname, '../../finance/sydo_oa_finance') }
];

const VERSIONS_FILE = path.resolve(__dirname, '../dist/versions.json');

function checkUpstreamUpdates() {
  console.log('[SyncUpstream] Checking upstream repositories for new commits...');

  let existingVersions = [];
  if (fs.existsSync(VERSIONS_FILE)) {
    try {
      existingVersions = JSON.parse(fs.readFileSync(VERSIONS_FILE, 'utf8'));
    } catch (e) {
      existingVersions = [];
    }
  }

  const existingShas = new Set(existingVersions.map(v => v.sha));
  const newCommits = [];

  UPSTREAM_REPOS.forEach(repo => {
    try {
      console.log(`Checking ${repo.name}...`);
      let headSha = null;
      if (fs.existsSync(repo.localPath)) {
        headSha = execSync(`git -C "${repo.localPath}" rev-parse HEAD`, { stdio: 'pipe' }).toString().trim();
      } else {
        const output = execSync(`git ls-remote ${repo.url} HEAD`, { stdio: 'pipe', timeout: 8000 }).toString().trim();
        headSha = output.split('\t')[0];
      }

      if (headSha) {
        if (!existingShas.has(headSha)) {
          console.log(`🚀 [NEW COMMIT DETECTED] ${repo.name} has new HEAD: ${headSha}`);
          newCommits.push({ repo: repo.name, url: repo.url, sha: headSha });
        } else {
          console.log(`✓ ${repo.name} is up to date (HEAD: ${headSha.substring(0, 7)})`);
        }
      }
    } catch (err) {
      console.warn(`[SyncUpstream] Warning checking ${repo.name}: ${err.message}`);
    }
  });

  return newCommits;
}

if (require.main === module) {
  const updates = checkUpstreamUpdates();
  if (updates.length > 0) {
    console.log(`[SyncUpstream] Found ${updates.length} new commits. Triggering rebuild.`);
    process.exit(0);
  } else {
    console.log('[SyncUpstream] No new commits detected. Workspace is up-to-date.');
    process.exit(0);
  }
}

module.exports = {
  checkUpstreamUpdates
};
