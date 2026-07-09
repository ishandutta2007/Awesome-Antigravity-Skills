const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [search, replace] of replacements) {
        if (content.includes(search)) {
            content = content.split(search).join(replace);
            changed = true;
        }
    }
    if (changed) {
        fs.writeFileSync(filePath, content);
    }
}

function processDir(dir, replacements) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath, replacements);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.json') || fullPath.endsWith('.md')) {
            replaceInFile(fullPath, replacements);
        }
    }
}

const replacements = [
    ["'../skills'", "'../plugins'"],
    ['"../skills"', '"../plugins"'],
    ["'./skills'", "'./plugins'"],
    ['"./skills"', '"./plugins"'],
    ["'/skills'", "'/plugins'"],
    ['"/skills"', '"/plugins"'],
    
    ["'../catalog.json'", "'../registry.json'"],
    ['"../catalog.json"', '"../registry.json"'],
    ["'./catalog.json'", "'./registry.json'"],
    ['"./catalog.json"', '"./registry.json"'],
    
    ["'../CATALOG.md'", "'../REGISTRY.md'"],
    ['"../CATALOG.md"', '"../REGISTRY.md"'],
    ["'./CATALOG.md'", "'./REGISTRY.md'"],
    ['"./CATALOG.md"', '"./REGISTRY.md"'],
    
    ["'../bundles.json'", "'../packages.json'"],
    ['"../bundles.json"', '"../packages.json"'],
    ["'./bundles.json'", "'./packages.json'"],
    ['"./bundles.json"', '"./packages.json"'],
    
    ["'../aliases.json'", "'../shortcuts.json'"],
    ['"../aliases.json"', '"../shortcuts.json"'],
    ["'./aliases.json'", "'./shortcuts.json'"],
    ['"./aliases.json"', '"./shortcuts.json"'],
    
    ["'../lib/", "'../core/"],
    ['"../lib/', '"../core/'],
    ["'./lib/", "'./core/"],
    ['"./lib/', '"./core/'],
    ["'lib/", "'core/"],
    ['"lib/', '"core/'],

    ["'../bin/", "'../cli-entry/"],
    ['"../bin/', '"../cli-entry/'],

    ["'../scripts/", "'../build-tools/"],
    ['"../scripts/', '"../build-tools/'],
    
    ["'../tests/", "'../specs/"],
    ['"../tests/', '"../specs/']
];

['cli-entry', 'core', 'build-tools', 'specs'].forEach(dir => processDir(dir, replacements));
