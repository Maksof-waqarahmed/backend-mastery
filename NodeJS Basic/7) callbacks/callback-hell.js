const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file", e)
        return
    }
    const updatedData = data.toLocaleUpperCase();

    fs.writeFile(path.join(__dirname, 'output.txt'), updatedData, (err) => {
        if (err) {
            console.error("Error reading file", e)
            return
        }

        fs.readFile(path.join(__dirname, 'output.txt'), 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file", e)
                return
            }

            console.log("Data", data)
        })
    })
})