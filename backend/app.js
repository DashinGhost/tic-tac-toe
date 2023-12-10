const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const cors = require("cors");
const Game = require('./models/gameModel');
const globalErrorHandler = require('./controllers/errorController');
const routes = require('./routes/routes');



app.use(cors());

app.use(bodyparser.json());

app.use(routes);

app.use(globalErrorHandler);


module.exports = app;
