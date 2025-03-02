let EventEmitter = require('events').EventEmitter;
let event = new EventEmitter();


setInterval(() => {
  event.emit('hello', 1)
}, 1000);

setInterval(() => {
  event.emit('hello', 2)
}, 2000);

event.on('hello', (data) => {
  console.log(data)
})  

setTimeout(() => {
  console.log('removeAlllisteners')
  event.removeAllListeners()
}, 8000);