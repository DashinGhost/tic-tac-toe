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
// app.get("/", (req, res, next) => {
//   res.status(200).json({ status: "success", message: "default route working" });
// });

// app.post("/start", (req, res, next) => {
//   console.log(req.body);
//   const gameId = req.body.email1 + req.body.email2 + req.body.startTime;

//   res.status(200).json({
//     status: "success",
//     data: {
//       gameId
//     }
//   });
// });

// app.post("/input", gameInput);

app.use(globalErrorHandler);


module.exports = app;
