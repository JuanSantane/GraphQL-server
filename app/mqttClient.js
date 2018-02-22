const mqtt = require("mqtt");
const settings = require("./settings");
const mqttOptions = {
  port: 1883,
  protocol: "mqtt",
  host: "192.168.188.67"
};

const mqttClient = mqtt.connect(mqttOptions);
mqttClient.on("connect", () => {
    console.log("SUBSCRIPTOR CONECTADO A MQTT");
    mqttClient.subscribe(settings.mqttClient.topics.queryTester);
});

module.exports = mqttClient;
