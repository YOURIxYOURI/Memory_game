const jsonServer = require('json-server');
const generateData = require('./generateData');

const data = generateData();
const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use('/api', router);

const port = 3001;

server.listen(port, () => {
  console.log(`Fake API is running at http://localhost:${port}`);
});