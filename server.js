const express = require('express');
const app = express();
const port = 3000;

app.get('/oi', (req, res) => res.send('hello').end());

app.get('/healthyz', (req, res) => res.status(200).end());
app.get('/readyz', (req, res) => res.status(200).end());

app.listen(port, () => console.log(`Listening on port ${port}!`))

