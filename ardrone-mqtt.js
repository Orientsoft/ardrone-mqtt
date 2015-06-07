module.exports.mqtt = function (droneIP, broker, topic) {
  var ardroneMqtt = {}
  ardroneMqtt.drone = require('./lib/my-drone')(droneIP)
  ardroneMqtt.listener = require('./lib/listener')( broker
                                                  , topic
                                                  , ardroneMqtt.drone)
  
  return ardroneMqtt
}

module.exports.borgnix = function (droneIP) {
  var ardoneBorgnix = {}
  ardoneBorgnix.drone = require('./lib/my-drone')(droneIP)
  ardoneBorgnix.listener = require('./lib/borgnix-listener')(
                             ardoneBorgnix.drone)
  return ardoneBorgnix
}