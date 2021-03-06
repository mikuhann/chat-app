const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');

container.resolve(function(users) {
  const app = SetupExpress();

  function SetupExpress() {
    const router = require('express-promise-router')();

    function configureExpress(app) {
      app.use(express.static('public'));
      app.set('view engine', 'ejs');
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
        extended: true,
      }));
    }

    const app = express();

    const server = http.createServer(app);

    const PORT = 5000 || process.env.PORT;

    server.listen(PORT, () => {
      console.log(`Listening port: ${PORT}`);
    });

    configureExpress(app);

    users.setRouting(router);

    app.use(router);
  }
});
