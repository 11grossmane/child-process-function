const cp = require("child_process")

const spawn = ({
    callback,
    callbackArgs,
    onMessage,
    onSuccess,
    onError,
    timeout,
}) => {
    //parsing args so they can be passed in node -e with correct formatting
    let parsedArgs
    if (callbackArgs && callbackArgs.length) {
        parsedArgs = callbackArgs
            .map((arg) => {
                if (typeof arg === "string") return `'${arg}'`
                if (typeof arg === "object") return JSON.stringify(arg)
                return arg
            })
            .join(".")
    }

    //spawning child process with function
    const child = cp.spawn(
        "node",
        ["-e", `(${callback})${parsedArgs ? `(${parsedArgs})` : "()"};`],
        {
            stdio: ["inherit", "inherit", "inherit", "ipc"],
            cwd: __dirname, //this can also be prepended to the file name
            detached: true, //child process does not end when parent ends
        }
    )

    //logging stdout and stderr from child process

    let timeoutId = setTimeout(() => {
        child.kill() // Does not terminate the Node.js process in the shell.
    }, timeout || 3000)

    child.on("message", (msg) => {
        console.log(msg)
    })
    child.on("exit", (code, sig) => {
        if (code === 0) {
            onSuccess && onSuccess()
        } else if (code === 1) {
            onError && onError()
        }
        clearTimeout(timeoutId)
    })
}

module.exports.spawn = spawn
