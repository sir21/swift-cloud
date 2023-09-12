const { initiateDatabase } = require("./services/database.service");
const port = 8000;

const { App } = require("./app");

App.listen(port, () => {
  initiateDatabase();
  console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
});
