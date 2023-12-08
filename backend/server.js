const app = require("./app");
require('dotenv').config();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then((con) => console.log("DB Connection Successfull "));

app.listen(port, () => console.log("server listening on port:" + port));
