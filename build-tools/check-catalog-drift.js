const fs = require('fs');
const path = require('path');
const { computeArtifacts } = require('./build-catalog');

const ROOT = path.resolve(__dirname, '..');

function readJson(file, root) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
}

function readDiskArtifacts(root = ROOT) {
  try {
    return {
      catalog: readJson('registry.json', root),
      bundles: readJson('packages.json', root),
      aliases: readJson('shortcuts.json', root),
      catalogMarkdown: fs.readFileSync(path.join(root, 'REGISTRY.md'), 'utf8'),
    };
  } catch (err) {
    throw new Error(`check-catalog-drift: failed to read a catalog artifact (${err.message}). Run \`npm run build:catalog\` to generate them.`, { cause: err });
  }
}

function stripGeneratedAt(obj) {
  const clone = JSON.parse(JSON.stringify(obj));
  delete clone.generatedAt;
  return JSON.stringify(clone);
}

function stripMarkdownTimestamp(md) {
  return md.replace(/^Generated at: .*$/m, 'Generated at: <timestamp>');
}

// Pure comparison: returns the list of artifact names that differ between the
// freshly computed artifacts and the on-disk ones, ignoring the generatedAt timestamp.
function findDrift(fresh, disk) {
  const checks = [
    ['registry.json', stripGeneratedAt(fresh.catalog), stripGeneratedAt(disk.catalog)],
    ['packages.json', stripGeneratedAt(fresh.bundles), stripGeneratedAt(disk.bundles)],
    ['shortcuts.json', stripGeneratedAt(fresh.aliases), stripGeneratedAt(disk.aliases)],
    ['REGISTRY.md', stripMarkdownTimestamp(fresh.catalogMarkdown), stripMarkdownTimestamp(disk.catalogMarkdown)],
  ];
  const drift = [];
  for (const [name, freshValue, diskValue] of checks) {
    if (freshValue !== diskValue) drift.push(name);
  }
  return drift;
}

function run() {
  const fresh = computeArtifacts();
  const disk = readDiskArtifacts();
  const drift = findDrift(fresh, disk);
  if (drift.length) {
    for (const name of drift) {
      console.error(`Catalog drift detected in ${name}.`);
    }
    console.error('Run `npm run build:catalog` and commit the regenerated artifacts.');
    process.exit(1);
  }
  console.log('Catalog artifacts are in sync.');
}

if (require.main === module) {
  run();
}

module.exports = { findDrift, readDiskArtifacts, run };
