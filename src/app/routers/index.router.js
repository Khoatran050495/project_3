const userrouter = require('./user.router');
const productrouter = require('./product.router');
const specs = require('./specs.router');
const orders = require('./Orders.routers');
const carditems = require('./Carditem.route');
const history = require('./History.route');

function Routers(app) {
  app.use('/api/v1/user', userrouter);
  app.use('/api/v1/products', productrouter);
  app.use('/api/v1/specs', specs);
  app.use('/api/v1/orders', orders);
  app.use('/api/v1/carditem', carditems);
  app.use('/api/v1/history', history);
}
module.exports = Routers;
