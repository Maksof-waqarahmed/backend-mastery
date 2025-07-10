console.log("In wrapper demo.js file");

console.log("__filename in wrapper demo", __filename);
console.log("__dirname in wrapper demo", __dirname);

const wrapperDemo = require('./wrapper-explorer');

wrapperDemo.greet("Waqar Rana");