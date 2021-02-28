const cp = require('child_process')

const spawn = (cb, ...args) => {
    //parsing args so they can be passed in node -e with correct formatting
    const parsedArgs = args
        .map((arg) => {
            if (typeof arg === 'string') return `'${arg}'`
            if (typeof arg === 'object') return JSON.stringify(arg)
            return arg
        })
        .join('.')

    //spawning child process with function
    const child = cp.spawn('node', ['-e', `(${cb})(${parsedArgs});`], {
        cwd: __dirname, //this can also be prepended to the file name
        detached: false //child process ends when parent ends
    })

    //logging stdout and stderr from child process
    child.stdout.on('data', (data) => console.log(data.toString()))
    child.stderr.on('error', (error) => console.error(error.toString()))
}

module.exports.spawn = spawn
