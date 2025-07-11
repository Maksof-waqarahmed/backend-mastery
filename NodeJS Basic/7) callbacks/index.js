const fs = require('fs');
const path = require('path');
function person(name, callBack) {
    console.log("Hello, My Name Is:", name);
    callBack()
}

function address() {
    console.log("Pakistan")
}

person("Waqar", address);

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file", e)
        return
    }
    console.log("Data", data)
})