Ardrone-MQTT
============

How to use
----------

### 将AR.Drone接入无线网络

首先启动AR.Drone并连接其wifi, 然后使用util目录下的[ardrone-wpa2][1]将AR.Drone连接到无线路由网络中

如果AR.Drone上没有安装过ardrone-wpa2, 执行以下命令进行安装:

```
util/ardrone-wpa2/script/install
```

完成安装后， 执行以下命令将AR.Drone接入WiFi网络:

```
util/ardrone-wpa2/script/connect "WIFI_SSID" -p "WIFI_PASSWORD"
```
在路由器管理页面中找到AR.Drone的IP地址，AR.Drone的主机名默认为空

### 启动

```
var drone = require('../ardrone-mqtt')( 'DRONE_IP'
                                      , 'MQTT_BROKER'
                                      , 'SUBSCRIBE_TOPIC')
```

Command
-------

### takeoff

Command the drone to disable enmergency mode and take off

```
{
	'type': 'pilot',
    'pilot': {
    	'action': 'takeoff'
    }
}
```

### land

Command the frone to land

```
{
	'type': 'pilot',
    'pilot': {
    	'action': 'land'
    }
}
```

### maneuver

In air maneuver commands

```
{
	'type': 'pilot'
    'pilot': {
    	'action': 'ACTION',
        'speed': SPEED,
        'time': TIME
    }
}
```

**Parameters**

> **action**: supported actions include *front*, *back*, *left*, *right*, *up*, *down*, *clockwise*
> **speed**: the flying speed of the drone, an interger between 0 and 1
> **time**: the duration the command last

### Send video stream

Command the drone to send the video stream from its camera to a websocket

```
{
	'type': 'video',
    'video': {
    	'action': 'start-ws-video',
        'url': 'URL'
    }
}
```

**Parameters**

> **url**: the url for the websocket to receive the video stream, e.g. ws://foo.bar.com/ws/video

### Switch camera

Swtich the video source between the front camera and buttom camera

```
{
	'type': 'video',
    'video': {
    	'action': 'switch-camera'
    }
}
```

[1]: https://github.com/daraosn/ardrone-wpa2