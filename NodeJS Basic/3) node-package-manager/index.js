const lodash = require('lodash');

const names = ["waqar", "ahmed"]
const capitilize = lodash.map(names, lodash.capitalize);

console.log("capitilize", capitilize)