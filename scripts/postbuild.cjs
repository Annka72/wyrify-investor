const fs = require('fs');
const path = require('path');

const distIndex = path.join(__dirname, '../dist/index.html');
const gateTemplate = path.join(__dirname, 'gate-index.html');

const built = fs.readFileSync(distIndex, 'utf8');
const match = built.match(/src="(\/assets\/[^"]+\.js)"/);
if (!match) {
  console.error('postbuild: could not find script src in dist/index.html');
  process.exit(1);
}
const scriptSrc = match[1];

let gate = fs.readFileSync(gateTemplate, 'utf8');
gate = gate.replace('__APP_SCRIPT_SRC__', scriptSrc);

fs.writeFileSync(distIndex, gate);
console.log('postbuild: gate applied, app script:', scriptSrc);
