# child-process-function ![travis](https://travis-ci.org/11grossmane/child-process-function.svg?branch=master)

child-process-function is a node library for running function in parallel. Unlike other commonly used libraries that claim parallelism, but are actually confined to the concurrency pattern of promises and javascript's event-loop, child-process-function uses node's built-in child_process library to create actual parallelism for blazing fast execution.

## Installation

```bash
npm install child-process-function
```

## Usage

```javascript
 * @param {requestCallback} func
 * @param {Mixed} [...args] Unlimited amount of optional parameters
 spawn(func,...args)
```

Why wait for the event loop...spawn will kick off a true child process which executes your function in parallel. It would be the same as if you had a separate file and used node's child_process.spawn.

```javascript
const spawn = require('child-process-function')

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
