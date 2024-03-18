const mqtt = require('mqtt');
const uuid = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

const options = {
  clientId: uuid.v4(),
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: 'mqtt',
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  keepalive: 60,
  reconnectPeriod: 5000,
  clean: true,
  encoding: 'utf8',
};

const client = mqtt.connect(options);

function subscribeTopic(topic) {
  const topicStr = String(topic);
  client.subscribe(topicStr, (error) => {
    if (error) console.log(`Failed to subscribe topic: ${topicStr}`);
    else console.log(`Succeed to subscribe topic: ${topicStr}`);
  });
}

publishMessage = (topic, message) => {
  if (client.connected == true) {
    const topicStr = String(topic);
    const messageJson = JSON.stringify(message);
    console.log(`Published to topic[${topicStr}]: ${messageJson}`);
    client.publish(topic, messageJson);
  }
};

// setup the callbacks
client.on('connect', function () {
  console.log('Connected to MQTT broker');
});

client.on('error', function (error) {
  console.log('MQTT ERROR', JSON.stringify(error));
});

// client.on('message', function (topic, message) {
//   // called each time a message is received
//   console.log(`Received message from [${topic}]: ${message.toString()}`);
// });

module.exports = { mqttClient: client, subscribeTopic, publishMessage };
