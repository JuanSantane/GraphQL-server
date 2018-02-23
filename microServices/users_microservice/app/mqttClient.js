const mqtt = require("mqtt");
const settings = require("./settings");
const Rx = require("rxjs");
const mqttOptions = {
  port: 1883,
  protocol: "mqtt",
  host: "192.168.188.67"
};
const userGetAll = settings.mqttClient.topics.outbox.getAllUserRqst;

const userGetAllsubject = new Rx.Subject();
const untrackedsubject = new Rx.Subject();

const mqttClient = mqtt.connect(mqttOptions);
mqttClient.on("connect", () => {
    console.log("USERS MICROSERVICE CONECCTED TO MQTT");
    mqttClient.subscribe('#')
});

mqttClient.on('message', (topic, message) => {
  console.log(topic, message.toString());
  switch(topic){
    case(userGetAll):
      console.log(message.toString());
      userGetAllsubject.next(message.toString());
      break;
    default:
      console.log("MESSAGE WITHOUT TRACKED TOPIC ==> ", message.toString())
      untrackedsubject.next(message.toString());
  }  
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
