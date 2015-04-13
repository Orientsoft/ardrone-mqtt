var mqtt = require('mqtt')
  , subTopic
  , myDrone
  , mqttBroker
  , listener = {}
  , actionList = [ 'takeoff', 'land', 'up', 'down', 'front'
                  , 'back', 'left', 'right', 'clockwise', 'stop']



function checkCommand (command) {
  console.log(command)
  if (command.type == 'pilot') {
    if (typeof command.pilot != 'undefined') {
      if (actionList.indexOf(command.pilot.action) != -1) {
        // TODO add param check
        return true
      } else return false
    } else return false
  } 
  else if (command.type == 'video') {
    return true
  }
}

module.exports = function (broker, topic, drone) {
  // listener.client = mqtt.connect(broker)
  mqttBroker = broker
  subTopic = topic
  myDrone = drone
  listener.client = mqtt.connect(mqttBroker)                

  listener.client.on('message', function executeCommand (topic, content) {
    console.log('message')
    try {
      command = JSON.parse(content)
    }
    catch (err) {
      console.log(err)
      return
    }
    command = JSON.parse(content)
    console.log(typeof content)
    if (checkCommand(command)) {
      console.log('valid command')
      myDrone.excute(command)
    }
    else {
      console.log('invalid command', command)
    }
  })

  listener.client.on('connect', function () {
    console.log('connected')
    listener.client.subscribe(subTopic)
  })
  return listener
}