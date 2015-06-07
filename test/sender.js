var mqtt = require('mqtt')

var client = mqtt.connect('mqtt://voyager.orientsoft.cn:11883')
// var topic = 'orient-sphero'
var topic = 'ardrone-test'

var stdin = process.openStdin()
require('tty').setRawMode(true)

stdin.on('keypress', function (chunk, key) {
  // process.stdout.write('Get Chunk: ' + chunk + '\n');
  if (key && key.name == 'w') front();
  if (key && key.name == 'a') left();
  if (key && key.name == 'd') right();
  if (key && key.name == 's') stop();
  if (key && key.ctrl && key.name == 'c') process.exit();
});