const path = require('path');

console.log("Directory Name", path.dirname(__filename));
console.log("File Name", path.basename(__filename));
console.log("File Extension", path.extname(__filename));
console.log("Resolve Path", path.resolve('user', 'document', 'a'))
console.log("Normalize Path", path.normalize('/user/.document/..../a/', './../', '/waqar'));

const p = 'abc';
const joinPath = path.join('/user', 'document', 'script', p);
console.log("joinPath", joinPath)
