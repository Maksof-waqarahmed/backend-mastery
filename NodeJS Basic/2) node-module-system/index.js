const firstModule = require('./first-module')

console.log(firstModule.add(2, 5))
console.log(firstModule.sub(2, 5))
console.log(firstModule.mul(2, 5))

try {
    console.log(firstModule.div(2, 0))
} catch (error) {
    console.log(`Caugh an Error ${error.message}`)
}