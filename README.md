# spawn-function ![travis](https://travis-ci.org/11grossmane/child-process-function.svg?branch=master)

This is a node library for running functions in parallel. Unlike other commonly used libraries that claim parallelism, but are actually confined to the concurrency pattern of promises and javascript's event-loop, spawn-function uses node's built-in child_process library to create actual parallelism for blazing fast execution.

## Installation

```bash
npm install spawn-function
```

## Usage

```javascript
 * @param {requestCallback} func
 * @param {Mixed} [...args] Unlimited amount of optional parameters
 spawn(func,...args)
```

Why wait for the call stack to empty, when you can kick off a true child process that executes your function in parallel. It would be the same as if you had a separate file and used node's child_process.spawn.

```javascript
const spawn = require('spawn-function')

function takesALongTime(foo, bar){
  ...
  console.log('this should log after')
}

function(){
  spawn(takesALongTime, 'foo', 'bar')
  console.log('this should log first')
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
