const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const Routers = require('../app/routers/index.router');

const dirname = path.join(__dirname, '../../public');

app.use(express.static(dirname));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
// app.use(helmet());
app.use(cors());
// database guns

// routes
Routers(app);

// handlers errors

module.exports = app;
