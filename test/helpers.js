const timer = (...args) => {
    const start = new Date()
    args.forEach((arg) => console.log(arg))
    let count = 0
    while (count < 10000) count++
    while (new Date().getTime() - start.getTime() < 1500) {}
    console.log('timer finished')
}
const logAfter = () => console.log('after')
module.exports = { timer, logAfter }
