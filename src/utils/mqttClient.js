const mqtt = require('mqtt');
const dotenv = require('dotenv');
dotenv.config();

const options = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: 'mqtts',
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  // keepalive: 60,
  // reconnectPeriod: 1000,
  // clean: true,
  // encoding: 'utf8'
};

const client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
  console.log('Connected to MQTT broker');

  // subscribe to a topic
  client.subscribe('esp8266/dht11', function (error) {});
});

client.on('error', function (error) {
  console.log(error);
});

client.on('message', function (topic, message) {
  // called each time a message is received
  console.log(`Received message from [${topic}]: ${message.toString()}`);
});

module.exports = client;
