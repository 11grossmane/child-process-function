# child-process-function ![travis](https://travis-ci.org/11grossmane/child-process-function.svg?branch=master)

This is a node library for running functions in parallel. Unlike other commonly used libraries that claim parallelism, but are actually confined to the concurrency pattern of promises and javascript's event-loop, child-process-function uses node's built-in child_process library to create actual parallelism for blazing fast execution.

## Installation

```bash
npm install child-process-function
```

## Basic Usage

Why wait for the call stack to empty, when you can kick off a true child process that executes your function in parallel. It would be the same as if you had a separate file and used node's child_process.spawn.

```javascript
const spawn = require('child-process-function')

function takesALongTime(){
  ...
  console.log('this should log after')
}

function(){
  spawn({callback: takesALongTime})
  console.log('this should log first')
}
```

## Options

```javascript
const opts = {
    callback: (foo, bar) => {
        console.log("happening inside child process")
    },
    callbackArgs: ["foo", "bar"], //optional
    onSuccess: () => console.log("this happens when my child function ends"), //optional,
    onMessage: (msg) =>
        console.log(
            msg,
            "this happens when my child function calls process.send('...')"
        ), //optional
    onError: () =>
        console.log("this happens if there is an error in my child function"), //optional,
    timeout: 3000, //optional, defaults to 3000
}

spawn(opts)
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
