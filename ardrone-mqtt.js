var ardroneMqtt = {}

module.exports = function (droneIP, broker, topic) {
  ardroneMqtt.drone = require('./lib/my-drone')(droneIP)
  ardroneMqtt.listener = require('./lib/listener')( broker
                                                  , topic
                                                  , ardroneMqtt.drone)
  
  return ardroneMqtt
}