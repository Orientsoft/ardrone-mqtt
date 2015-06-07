var drone = require('../lib/my-drone')('192.168.1.1')

setTimeout(function() {
  drone.websocketVideo('ws://127.0.0.1:1880/ws/vin')
}, 3000);

var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);
  if (key && key.ctrl && key.name == 'c') {
    drone.client.land()
    process.exit();
  }
  if (key)
    switch (key.name) {
      case 't': drone.client.takeoff(); break;
      case 'l': drone.client.land(); break;
      case 'w': drone.front(0.2); break;
      case 's': drone.back(0.2); break;
      case 'a': drone.left(0.2); break;
      case 'd': drone.right(0.2); break;
      case 'q': drone.clockwise(-0.2); break;
      case 'e': drone.clockwise(0.2); break;
      case 'j': drone.up(0.2); break;
      case 'k': drone.down(0.2); break;
      default: break;
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();
