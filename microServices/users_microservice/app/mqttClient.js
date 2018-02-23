const mqtt = require("mqtt");
const settings = require("./settings");
const Rx = require("rxjs");

const usersRqst = settings.mqttClient.topics.outbox.getAllUserRqst;

const userGetAllsubject = new Rx.Subject();
const untrackedsubject = new Rx.Subject();

const mqttClient = mqtt.connect(settings.mqttServer);
mqttClient.on("connect", () => {
    console.log("USERS MICROSERVICE CONECCTED TO MQTT");
    mqttClient.subscribe('#')
});

mqttClient.on("reconnect", () => {
  console.log("GATEWAY reconnect A MQTT");
  mqttClient.subscribe(settings.mqttClient.topics.queryTester);
});

mqttClient.on("offline", () => {
  console.log("GATEWAY offline A MQTT");
  mqttClient.subscribe(settings.mqttClient.topics.queryTester);
});
mqttClient.on("error", () => {
  console.log("GATEWAY error A MQTT");
  mqttClient.subscribe(settings.mqttClient.topics.queryTester);
});

module.exports = { mqttClient, userGetAllsubject, untrackedsubject }
