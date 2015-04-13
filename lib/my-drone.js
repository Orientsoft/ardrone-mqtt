var ardrone = require('ar-drone')
  , PaVEParser = require('ar-drone/lib/video/PaVEParser')
  , WebSocket = require('ws')
  , drone = {}

drone.client = {}
drone.camera = 'off'

timers = {}

drone.excute = function (command) {
  if (command.type == 'pilot') {
    switch (command.pilot.action) {
      case 'takeoff':
        console.log('got:', 'takeoff')
        drone.client.takeoff()
        break;
      case 'land':
        console.log('got:', 'land')
        drone.client.land()
        break;
      case 'stop':
        console.log('got:', 'stop')
        drone.client.stop()
        break;
      case 'front':
        console.log('got:', command)
        drone.front(command.pilot.speed, command.pilot.time)
        break;
      case 'back':
        console.log('got:', command)
        drone.back(command.pilot.speed, command.pilot.time)
        break;
      case 'up':
        console.log('got:', command)
        drone.up(command.pilot.speed, command.pilot.time)
        break;
      case 'down':
        console.log('got:', command)
        drone.down(command.pilot.speed, command.pilot.time)
        break;
      case 'left':
        console.log('got:', command)
        drone.left(command.pilot.speed, command.pilot.time)
        break;
      case 'right':
        console.log('got:', command)
        drone.right(command.pilot.speed, command.pilot.time)
        break;
      case 'clockwise':
        console.log('got:', command)
        drone.clockwise(command.pilot.speed, command.pilot.time)
        break;
      default:
        console.log('wrong command')
        break;
    }
  }
  if (command.type == 'video') {
    switch (command.video.action) {
      case 'start-ws-video':
        drone.websocketVideo(command.video.url)
        break;
      case 'switch-camera':
        drone.switchCamera()
        break;
      default:
        console.log('wrong command')
        break;
    }
  }
}

drone.up = function up (inSpeed, inTime) {
  var time = (typeof inTime != 'undefined'? inTime: 1000)
    , speed = (typeof inSpeed != 'undefined'? inSpeed: 0.5)
  drone.client.up(speed)
  if (typeof timers.up != 'undefined')
    clearTimeout(timers.up)
  timers.up = setTimeout(function() {
    drone.client.stop()
  }, time);
}

drone.down = function down (inSpeed, inTime) {
  var time = (typeof inTime != 'undefined'? inTime: 1000)
    , speed = (typeof inSpeed != 'undefined'? inSpeed: 0.5)
  drone.client.down(speed)
  if (typeof timers.down != 'undefined')
    clearTimeout(timers.down)
  timers.down = setTimeout(function() {
    drone.client.stop()
  }, time);
}

drone.left = function left (inSpeed, inTime) {
  var time = (typeof inTime != 'undefined'? inTime: 1000)
    , speed = (typeof inSpeed != 'undefined'? inSpeed: 0.5)
  drone.client.left(speed)
  if (typeof timers.left != 'undefined')
    clearTimeout(timers.left)
  timers.left = setTimeout(function() {
    drone.client.stop()
  }, time);
}

drone.right = function right (inSpeed, inTime) {
  var time = (typeof inTime != 'undefined'? inTime: 1000)
    , speed = (typeof inSpeed != 'undefined'? inSpeed: 0.5)
  drone.client.right(speed)
  if (typeof timers.right != 'undefined')
    clearTimeout(timers.right)
  timers.right = setTimeout(function() {
    drone.client.stop()
  }, time);
}

drone.front = function front (inSpeed, inTime) {
  var time = (typeof inTime != 'undefined'? inTime: 1000)
    , speed = (typeof inSpeed != 'undefined'? inSpeed: 0.5)
  drone.client.front(speed)
  if (typeof timers.front != 'undefined')
    clearTimeout(timers.front)
  timers.front = setTimeout(function() {
    drone.client.stop()
  }, time);
}

drone.back = function back (inSpeed, inTime) {
  var time = (typeof inTime != 'undefined'? inTime: 1000)
    , speed = (typeof inSpeed != 'undefined'? inSpeed: 0.5)
  drone.client.back(speed)
  if (typeof timers.back != 'undefined')
    clearTimeout(timers.back)
  timers.back = setTimeout(function() {
    drone.client.stop()
  }, time);
}

drone.clockwise = function clockwise (inSpeed, inTime) {
  var time = (typeof inTime != 'undefined'? inTime: 400)
    , speed = (typeof inSpeed != 'undefined'? inSpeed: 0.4)
  drone.client.clockwise(speed)
  if (typeof timers.clockwise != 'undefined')
    clearTimeout(timers.clockwise)
  timers.clockwise = setTimeout(function() {
    drone.client.stop()
  }, time);
}

drone.websocketVideo = function websocketVideo (url) {
  drone.client.config('video:video_channel', 0)
  drone.camera = 'front'
  var video = drone.client.getVideoStream()
    , parser = new PaVEParser()
    , ws = new WebSocket(url)

  ws.on('open', function () {
    video.on('data', function (data) {
      parser.write(data)
    })

    video.on('error', console.log(err))

    parser.on('data', function (data) {
      ws.send(data.payload, {binary: true})
    })
  })
}

drone.switchCamera = function switchCamera () {
  switch (drone.camera) {
    case 'buttom':
      drone.client.config('video:video_channel', 0)
      break;
    case 'front':
      drone.client.config('video:video_channel', 3)
      break;
    case 'off':
      console.log('camera offline, turn it on first.')
      break;
    default:
      drone.camera = 'off'
      break;
  }
}

module.exports = function (ip) {
  drone.client = ardrone.createClient({'ip': ip})
  return drone
}
