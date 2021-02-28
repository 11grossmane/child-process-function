const spawn = require("../src")

const asyncFunction = async () => {
    let count = 0
    while (count < 100000) count++
    console.log("inside async function")
}

const main = () => {
    console.log("\n")
    //notice how we aren't awaiting
    //shouldnt this mean we get the
    //async log first?
    asyncFunction()
    console.log("after")
}

main()

const mainTwo = () => {
    console.log("\n")

    //same result as above, even though this is
    //still utilizing event loop
    new Promise((res, rej) => {
        let count = 0
        while (count < 100000) count++
        console.log("inside promise")
    })
    console.log("after")
}

mainTwo()

const mainThree = () => {
    console.log("\n")

    //the timer part of setTimeout is actually happening inside a child process that is running in parallel...this is why code can execute while the timer is counting down
    //when the timer is finished, the callback gets put on event queue, and will execute when our call stack is empty?
    setTimeout(() => {
        console.log("inside timeout")
    }, 200)
    console.log("after")
}

//mainThree()

const mainFour = () => {
    console.log("\n")

    //the timer part of setTimeout is actually happening inside a child process that is running in parallel...this is why code can execute while the timer is counting down
    //when the timer is finished, the callback gets put on event queue, and will execute when our call stack is empty?
    let cont = false
    setTimeout(() => {
        console.log("inside timeout")
        cont = true
    }, 200)
    console.log("after")

    //callback never executed because this function cannot leave the callstack
    while (!cont) {}
}

//mainFour()

const mainFive = () => {
    console.log("\n")

    const opts = {
        callback: () => {
            let count = 0
            while (count < 100000) count++
            console.log("inside child process")

            //we can also send a message if we want
            process.send("this is a message")
        },
        onMessage: (msg) => {
            console.log(msg)
        },
    }

    spawn(opts)
    console.log("after")
}

mainFive()
