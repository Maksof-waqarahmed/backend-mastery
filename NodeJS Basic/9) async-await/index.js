function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

async function greetDelay(name) {
    await delay(2000);
    console.log("Name:", name)
}
greetDelay("Waqar");

function div(num1, num2) {
    return new Promise((resolve, reject) => {
        if (num2 === 0) {
            reject("Can't divide any number to zero")
        } else {
            resolve(num1 / num2)
        }
    })
}

async function main() {
    try {
        await div(10, 0)
    } catch (error) {
        console.log("Error", error)
    }
}
main()