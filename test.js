const test = require('tape');
const fs = require('fs');
const path = require('path');

const categories = [
  "Cc", "Cf", "Co", "Cs",
  "Ll", "Lm", "Lo", "Lt", "Lu",
  "Mc", "Me", "Mn",
  "Nd", "Nl", "No",
  "Pc", "Pd", "Pe", "Pf", "Pi", "Po", "Ps",
  "Sc", "Sk", "Sm", "So",
  "Zl", "Zp", "Zs",
];
const catFiles = categories.map((cat) => `${ cat }.js`);
catFiles.push("index.js");
 
test('check whether all Unicode category files exist', (t) => {  
  const files = fs.readdirSync(path.join(__dirname, "category"));
  t.same(files.sort(), catFiles.sort(), 'category files exist');
  
  const requires = catFiles.forEach((file) => {
    const module = () => require(path.join(__dirname, "category", file));
    t.doesNotThrow(module, `${ file } can be required`)
  });
  
  t.end();
});