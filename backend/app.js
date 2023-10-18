/* eslint-disable no-console */
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://dorozha.mesto.nomoredomainsrocks.ru',
    'https://dorozha.mesto.nomoredomainsrocks.ru',
    'http://www.dorozha.mesto.nomoredomainsrocks.ru',
    'https://www.dorozha.mesto.nomoredomainsrocks.ru',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  credentials: true,
  allowedHeaders: ['Content-Type'],
};

const errorHandler = require('./middlewares/errores');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('Connected to db');
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log('Сервер запустился');
});
app.use(cors(corsOptions));
app.use(requestLogger);

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
