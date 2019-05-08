const promBundle = require("express-prom-bundle");
const express = require('express');
const app = express();
const metricsMiddleware = promBundle({includeMethod: true});
var bodyParser = require('body-parser')
const path = require('path');
const port = 3000;

app.set('views', __dirname);
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/healthz', (req, res) => res.status(200).end());
app.get('/readyz', (req, res) => res.status(200).end());

app.use(metricsMiddleware);

app.get('/oi', (req, res) => res.send('hello').end());

app.get('/factorial', (req, res) => {
  res.render('factorial', {});
});

app.post('/factorial', (req, res) => {
  let result = factorial(+req.body.f);
  res.render('factorial', {result});
});

app.listen(port, () => console.log(`Listening on port ${port}!`))


function factorial(n){
  if(Number.isNaN(n)) return 'error';
  let result = 1;
  for(let i = n; i > 0; i--){
    result = result * i;
  }
  return result;
}
