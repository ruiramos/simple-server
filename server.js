const promBundle = require("express-prom-bundle");
const express = require('express');
const app = express();
const metricsMiddleware = promBundle({includeMethod: true});
const port = 3000;

app.get('/healthz', (req, res) => res.status(200).end());
app.get('/readyz', (req, res) => res.status(200).end());

app.use(metricsMiddleware);

app.get('/oi', (req, res) => res.send('hello').end());

app.get('/ping', (req, res) => {
  res.send('pong').end();
});

app.listen(port, () => console.log(`Listening on port ${port}!`))

