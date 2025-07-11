function delayFun(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

console.log("Promise Lecture Start");
delayFun(2000).then(() => console.log("After 2 sec promise resolved"));
console.log("End Promise Lecturer")

function div(num1, num2) {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            reject("Can't divide any number to zero")
        } else {
            resolve(num1 / num2)
        }
    })
}

div(10, 0).then((res) => console.log("Result:", res)).catch((err) => console.log("Error", err))