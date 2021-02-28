const timer = (...args) => {
    const start = new Date()

    //make sure undefined is not being passed in
    args.forEach((arg) => console.log(arg))
    let count = 0
    while (count < 10000) count++
    while (new Date().getTime() - start.getTime() < 1500) {}
    process.send("timer finished")
}
const logAfter = () => console.log("after")
module.exports = { timer, logAfter }
