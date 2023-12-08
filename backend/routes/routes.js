const express = require('express');
const {gameInput} = require('../controllers/gameController');
const {addUser, getUsersData} = require('../controllers/userController');
const routes = express.Router();

routes.get("/ping", (req, res, next) => {
  res.status(200).json({ status: "success", message: "app is alive!" });
});

routes.get('/usersdata', getUsersData)

routes.post("/start", addUser);

routes.post("/input", gameInput);

module.exports = routes;
