function person(name, callBack){
    console.log("Hello, My Name Is:", name);
    callBack()
}

function address(){
    console.log("Pakistan")
}

person("Waqar", address);