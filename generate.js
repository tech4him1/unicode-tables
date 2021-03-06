const fs = require('fs');
const path = require('path');
const unicodeDir = path.dirname(require.resolve('unicode/package.json'));
const categoryFiles = fs.readdirSync(path.join(unicodeDir, 'category'))
const categories = categoryFiles
  .map((f) => (f.endsWith('.js') ? f.slice(0, -3) : undefined))
  .reduce((list, cat) => {
    list[cat] = require(`unicode/category/${cat}`);
    return list;
  }, {});

const warningHeader = "// DO NOT CHANGE THIS FILE. This is an auto-generated list."

const formatFile = (symbols) => (`${ warningHeader }\nmodule.exports=${JSON.stringify(symbols)}`);

let indexFile = warningHeader + '\nmodule.exports = {\n';

for (let cat in categories) {
    const chars = Object.values(categories[cat]);
    
    const symbols = [];
    for (let char of chars) {
        // The base16 numbers will be converted to base10 for storing in JSON.
        const charCode = parseInt(char.value, 16);
        symbols.push(charCode);
    }
    
    const filename = `category/${ cat }.js`;
    fs.writeFileSync(path.join(__dirname, filename), formatFile(symbols));
    console.log(`${ filename } saved.`);
    indexFile += `  ${ cat }: require('./${ cat }.js'),\n`;
}


indexFile += '};';
fs.writeFileSync(path.join(__dirname, 'category/index.js'), indexFile);
console.log(`category/index.js saved.`);