/**
 * History Scanner & Version Snapshot Archiver
 * Scans Git commits across finance-frontend and sydo_oa_finance,
 * checks out/analyzes corresponding historical source states,
 * and generates isolated version snapshots.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ARCHITECTURE_BLUEPRINT } = require('./analyzer');

function getRecentCommits(repoPath, limit = 8) {
  try {
    const raw = execSync(`git -C "${repoPath}" log -n ${limit} --pretty=format:"%H|%h|%ad|%an|%s" --date=iso`, { stdio: 'pipe' }).toString().trim();
    if (!raw) return [];
    return raw.split('\n').map(line => {
      const [fullSha, shortSha, date, author, message] = line.split('|');
      return { fullSha, shortSha, date, author, message, repo: path.basename(repoPath) };
    });
  } catch (err) {
    console.warn(`[HistoryScanner] Could not get log for ${repoPath}: ${err.message}`);
    return [];
  }
}

/**
 * Build snapshot for a specific commit
 */
function createCommitSnapshot(repoPath, commitInfo, existingSnapshotsDir) {
  const snapshotPath = path.join(existingSnapshotsDir, `${commitInfo.fullSha}.json`);
  if (fs.existsSync(snapshotPath)) {
    console.log(`[HistoryScanner] Snapshot for ${commitInfo.shortSha} already exists, skipping.`);
    return JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
  }

  console.log(`[HistoryScanner] Generating snapshot for ${commitInfo.repo} @ ${commitInfo.shortSha}: "${commitInfo.message}"`);

  // Inspect files modified in this commit
  let changedFiles = [];
  try {
    changedFiles = execSync(`git -C "${repoPath}" diff-tree --no-commit-id --name-only -r ${commitInfo.fullSha}`, { stdio: 'pipe' })
      .toString().trim().split('\n').filter(Boolean);
  } catch (e) {
    changedFiles = [];
  }

  // Derive active modules for this version
  const modules = ARCHITECTURE_BLUEPRINT.modules.map(mod => {
    const cloned = { ...mod };
    // Check if module belongs to this repo
    const prefix = `${commitInfo.repo}/`;
    if (mod.sourcePath.startsWith(prefix)) {
      const subfilePath = mod.sourcePath.replace(prefix, '');
      try {
        execSync(`git -C "${repoPath}" cat-file -e ${commitInfo.fullSha}:${subfilePath}`, { stdio: 'pipe' });
        cloned.existsInCommit = true;
      } catch (e) {
        cloned.existsInCommit = false;
      }
    } else {
      cloned.existsInCommit = true; // external/other repo module
    }

    // Check if this module was modified in this commit
    cloned.isModified = changedFiles.some(f => mod.sourcePath.includes(f));
    return cloned;
  });

  // Calculate impacted modules and upstream/downstream
  const modifiedModules = modules.filter(m => m.isModified).map(m => m.id);
  const upstreamImpact = [];
  const downstreamImpact = [];

  modules.forEach(m => {
    if (m.dependencies.some(dep => modifiedModules.includes(dep))) {
      downstreamImpact.push(m.id);
    }
    if (modifiedModules.includes(m.id)) {
      m.dependencies.forEach(dep => upstreamImpact.push(dep));
    }
  });

  const snapshot = {
    sha: commitInfo.fullSha,
    shortSha: commitInfo.shortSha,
    repo: commitInfo.repo,
    date: commitInfo.date,
    author: commitInfo.author,
    message: commitInfo.message,
    changedFiles,
    modifiedModules,
    upstreamImpact: Array.from(new Set(upstreamImpact)),
    downstreamImpact: Array.from(new Set(downstreamImpact)),
    blueprint: {
      systems: ARCHITECTURE_BLUEPRINT.systems,
      modules: modules.filter(m => m.existsInCommit !== false),
      callChains: ARCHITECTURE_BLUEPRINT.callChains
    }
  };

  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot, null, 2), 'utf8');
  return snapshot;
}

module.exports = {
  getRecentCommits,
  createCommitSnapshot
};
