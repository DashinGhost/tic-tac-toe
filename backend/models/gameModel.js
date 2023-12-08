const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  _id: String,
  player1Email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // return emailRegex.test(value);
        return true;
      },
      message: "Invalid email format",
    },
  },
  player2Email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // return emailRegex.test(value);
        return true;
      },
      message: "Invalid email format",
    },
  },
  player1Turns: Array,
  player2Turns: Array,
  winnerEmail: String
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
