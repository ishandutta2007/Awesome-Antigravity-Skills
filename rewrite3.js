const fs = require('fs');
const path = require('path');
function replaceAll(file) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/'skills'/g, "'plugins'");
    content = content.replace(/"skills"/g, '"plugins"');
    content = content.replace(/\/skills/g, '/plugins');
    fs.writeFileSync(file, content);
}
const dirs = ['build-tools', 'cli-entry', 'specs'];
function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const file of fs.readdirSync(dir)) {
        const full = path.join(dir, file);
        if (fs.statSync(full).isDirectory()) walk(full);
        else if (full.endsWith('.js')) replaceAll(full);
    }
}
dirs.forEach(walk);
