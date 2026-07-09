const fs = require('fs');
let content = fs.readFileSync('core/skill-utils.js', 'utf8');
content = content.replace(/'skills'/g, "'plugins'");
content = content.replace(/"skills"/g, '"plugins"');
content = content.replace(/\/skills/g, '/plugins');
fs.writeFileSync('core/skill-utils.js', content);
