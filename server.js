'use strict'

const express = require('express');
const app = express();
const port = 5000;
const api = require('./controllers/api');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api',api);

app.get('/', (req, res) => res.send('Express Server'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))