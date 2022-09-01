const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { Joi, celebrate, errors } = require('celebrate');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { isAuth } = require('./middlewares/auth');
const NotFoundError = require('./components/NotFoundError');
const handleError = require('./components/handleError');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const app = express();
const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cors);
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,}\.[a-zA-Z0-9()]{1,}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(isAuth);
app.use('/users', users);
app.use('/cards', cards);
app.use('/*', () => {
  throw new NotFoundError('Путь не найден');
});
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT);
