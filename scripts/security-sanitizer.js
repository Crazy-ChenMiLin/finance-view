/**
 * Security & Sanitization Scanner
 * Enforces strict security requirements before publishing to GitLab Pages / GitHub Pages.
 * Redacts internal IPs, tokens, passwords and prevents accidental credential exposure.
 */

const fs = require('fs');
const path = require('path');

const SENSITIVE_PATTERNS = [
  { name: 'Private Key', regex: /-----BEGIN [A-Z ]+PRIVATE KEY-----/g },
  { name: 'GitLab / GitHub Token', regex: /(glpat-[a-zA-Z0-9_\-]{20,}|ghp_[a-zA-Z0-9]{30,}|github_pat_[a-zA-Z0-9_]{30,})/g },
  { name: 'Hardcoded Password in URL', regex: /:[a-zA-Z0-9_.-]+@([a-zA-Z0-9.-]+)/g },
  { name: 'MySQL Plaintext Password', regex: /feiliuzhixia3000chi/gi }
];

const REDACTION_MAP = [
  { search: /47\.108\.83\.49:3000/g, replace: 'gitlab.finance-oa.internal' },
  { search: /47\.108\.83\.49:3306/g, replace: 'db-cluster.finance-oa.internal:3306' },
  { search: /47\.108\.83\.49/g, replace: 'finance-host.internal' },
  { search: /http:\/\/47\.108\.83\.49:3000\/bitcq\//g, replace: 'https://gitlab.finance-oa.internal/bitcq/' },
  { search: /feiliuzhixia3000chi/gi, replace: '******(ENCRYPTED_VAULT_SECRET)' },
  { search: /czqCZQ197623@/gi, replace: 'dev-author@company.com' }
];

function sanitizeString(content) {
  let result = content;
  REDACTION_MAP.forEach(({ search, replace }) => {
    result = result.replace(search, replace);
  });
  return result;
}

function scanFileSecurity(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  SENSITIVE_PATTERNS.forEach(({ name, regex }) => {
    if (regex.test(content)) {
      violations.push(`Found potential ${name}`);
    }
  });

  return violations;
}

function sanitizeAndVerifyDirectory(dirPath) {
  console.log(`[SecurityScanner] Auditing artifacts in ${dirPath}...`);
  const files = [];

  function walk(current) {
    if (!fs.existsSync(current)) return;
    fs.readdirSync(current).forEach(f => {
      const full = path.join(current, f);
      if (fs.statSync(full).isDirectory()) {
        walk(full);
      } else {
        files.push(full);
      }
    });
  }

  walk(dirPath);

  let totalScanned = 0;
  let totalSanitized = 0;
  let hasViolation = false;

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (['.html', '.js', '.json', '.css', '.md', '.yml', '.yaml'].includes(ext)) {
      totalScanned++;
      let content = fs.readFileSync(file, 'utf8');
      const sanitized = sanitizeString(content);

      if (content !== sanitized) {
        fs.writeFileSync(file, sanitized, 'utf8');
        totalSanitized++;
        console.log(`[SecurityScanner] Sanitized credentials/internal IPs in: ${path.relative(dirPath, file)}`);
      }

      const issues = scanFileSecurity(file);
      if (issues.length > 0) {
        console.error(`🚨 [Security Alert] Security check failed on ${file}:`);
        issues.forEach(iss => console.error(`   - ${iss}`));
        hasViolation = true;
      }
    }
  });

  console.log(`[SecurityScanner] Audit complete. Scanned: ${totalScanned} files, Sanitized: ${totalSanitized} files.`);
  if (hasViolation) {
    throw new Error('Security Audit failed with critical violations! Please review the output above.');
  }
}

module.exports = {
  sanitizeString,
  scanFileSecurity,
  sanitizeAndVerifyDirectory
};
