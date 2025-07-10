const fs = require('fs');
const path = require('path');
//sync files
const newFolderpath = path.join(__dirname, 'files');

// if (!fs.existsSync(newFolderpath)) {
//     fs.mkdirSync(newFolderpath);
//     console.log("Folder Created Successfully");
// }

// const filePath = path.join(newFolderpath, 'name.txt')

// // fs.writeFileSync(filePath, "waqar");

// const readFileContent = fs.readFileSync(filePath, 'utf-8')
// console.log("File Content", readFileContent)

// fs.appendFileSync(filePath, "\nThis is a new name\nAhmed")

// const newReadFileContent = fs.readFileSync(filePath, 'utf-8')
// console.log(newReadFileContent)

//async files

const asyncFilePath = path.join(newFolderpath, 'async.txt')
fs.writeFile(asyncFilePath, "Hello! from Async file", (err) => {
    if (err) throw err;
    console.log("File Created Succesfully")

    fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log("Data: ", data)
    })

    fs.appendFile(asyncFilePath, "\nnew Line", (err) => {
        if (err) throw err;
        console.log("File Updated Succesfully");
    })

    fs.readFile(asyncFilePath, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log("Updated Data: ", data)
    })

})
