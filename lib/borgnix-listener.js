var sdk = require('borgnix-sdk')
  , type = 'ardrone'

module.exports = function (uuid, token, drone) {
  var client = new sdk.Device( uuid, token)
  client.on('message', function (payload) {
    
  })
}