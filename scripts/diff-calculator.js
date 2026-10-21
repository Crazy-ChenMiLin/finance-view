/**
 * Architecture Diff Calculator
 * Compares two architecture snapshots and computes structural differences,
 * newly introduced/removed/modified modules, and impact scopes.
 */

function computeArchitectureDiff(baseSnapshot, targetSnapshot) {
  const baseModulesMap = new Map();
  const targetModulesMap = new Map();

  (baseSnapshot.blueprint.modules || []).forEach(m => baseModulesMap.set(m.id, m));
  (targetSnapshot.blueprint.modules || []).forEach(m => targetModulesMap.set(m.id, m));

  const addedModules = [];
  const removedModules = [];
  const modifiedModules = [];
  const unchangedModules = [];

  // Check target vs base
  targetModulesMap.forEach((targetMod, id) => {
    if (!baseModulesMap.has(id)) {
      addedModules.push(targetMod);
    } else {
      const baseMod = baseModulesMap.get(id);
      // Check if entry points, dependencies or isModified changed
      const depChanged = JSON.stringify(baseMod.dependencies || []) !== JSON.stringify(targetMod.dependencies || []);
      const entryChanged = JSON.stringify(baseMod.entrypoints || []) !== JSON.stringify(targetMod.entrypoints || []);
      const wasModifiedInCommit = targetSnapshot.modifiedModules && targetSnapshot.modifiedModules.includes(id);

      if (depChanged || entryChanged || wasModifiedInCommit) {
        modifiedModules.push({
          id,
          name: targetMod.name,
          system: targetMod.system,
          sourcePath: targetMod.sourcePath,
          role: targetMod.role,
          depChanged,
          entryChanged,
          wasModifiedInCommit,
          before: { dependencies: baseMod.dependencies, entrypoints: baseMod.entrypoints },
          after: { dependencies: targetMod.dependencies, entrypoints: targetMod.entrypoints }
        });
      } else {
        unchangedModules.push(id);
      }
    }
  });

  // Check removed
  baseModulesMap.forEach((baseMod, id) => {
    if (!targetModulesMap.has(id)) {
      removedModules.push(baseMod);
    }
  });

  // Impact summary
  const affectedModuleIds = new Set([
    ...addedModules.map(m => m.id),
    ...removedModules.map(m => m.id),
    ...modifiedModules.map(m => m.id),
    ...(targetSnapshot.downstreamImpact || [])
  ]);

  return {
    baseSha: baseSnapshot.sha,
    baseShortSha: baseSnapshot.shortSha,
    targetSha: targetSnapshot.sha,
    targetShortSha: targetSnapshot.shortSha,
    summary: {
      addedCount: addedModules.length,
      removedCount: removedModules.length,
      modifiedCount: modifiedModules.length,
      totalAffected: affectedModuleIds.size
    },
    addedModules,
    removedModules,
    modifiedModules,
    affectedModuleIds: Array.from(affectedModuleIds),
    changedFiles: targetSnapshot.changedFiles || []
  };
}

module.exports = {
  computeArchitectureDiff
};
