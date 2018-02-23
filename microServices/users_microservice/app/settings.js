module.exports = {
  host: "localhost",
  port: 3000,
  wsPort: 3010,
  mainRute: "graphql",
  mqttClient: {
    host: "192.168.188.67",
    port: 1883,
    protocol: "mqtt",
    topics: {
      queryTester: "testingQuery",
      inbox: {
        getAllUsersResp: "getAllUsersResp"
      },
      outbox: {
        getAllUserRqst : "getAllUserRqst"
      }
    }
  },
  mqttServer: {
    port: 1883,
    protocol: "mqtt",
    host: "192.168.188.67"
  }
};
