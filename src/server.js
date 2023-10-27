const app = require('./app/app');
const Sequelize = require('../src/library/database/connect.mysql');
const port = 8080;

app.listen(port, async () => {
  try {
    await Sequelize.authenticate();
    console.log('connect mysql successfully');
    console.log(`http://localhost:${port}`);
  } catch (error) {
    console.log('err', error);
  }
});
