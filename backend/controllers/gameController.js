const Game = require("../models/gameModel");
const catchAsync = require("../utils/cathcAsync");
const checkWin = require('../utils/checkWin');
const User = require('../models/userModel');

const gameInput = catchAsync(async (req, res, next) => {
  let nextPlayer = "PLAYER2";
  let gameData;

  const { gameId, input, name1, email1, name2, email2 } = req.body;
  let fetchedGame = await Game.findById(gameId).lean();
  console.log("Fetched Game:", fetchedGame);
  if (fetchedGame) {
    console.log("FETCHED GAME:", fetchedGame);
    if (fetchedGame.player2Turns.length >= fetchedGame.player1Turns.length) {
      nextPlayer = "PLAYER2";
    } else {
      nextPlayer = "PLAYER1";
    }
    if (nextPlayer === "PLAYER1") {
      gameData = {
        ...fetchedGame,
        player2Turns: [...fetchedGame.player2Turns, input[0] + "" + input[1]],
      };
    } else {
      gameData = {
        ...fetchedGame,
        player1Turns: [...fetchedGame.player1Turns, input[0] + "" + input[1]],
      };
    }
  } else {
    gameData = {
      _id: gameId,
      player1Email: email1,
      player2Email: email2,
      player1Turns: [input[0] + "" + input[1]],
      player2Turns: [],
      result: "",
    };
  }
  if (!fetchedGame) {
    await Game.create(gameData);
  } else {
    const updatedGame = await Game.findOneAndUpdate({ _id: gameId }, gameData, { new: true});
    if(checkWin(updatedGame.player1Turns)[0]) {
      await User.updateOne({ _id: email1 }, { $inc: { wins: 1 } });
      await User.updateOne({ _id: email2 }, { $inc: { looses: 1 } });
      return res.status(200).json({
        status: "success",
        data: {
          nextPlayer,
          winningPlayer: "PLAYER1",
          winningCells: checkWin(updatedGame.player1Turns)[1]
        },
      });
    }

    if(checkWin(updatedGame.player2Turns)[0]) {
      await User.updateOne({ _id: email2 }, { $inc: { wins: 1 } });
      await User.updateOne({ _id: email1 }, { $inc: { looses: 1 } });
      return res.status(200).json({
        status: "success",
        data: {
          nextPlayer,
          winningPlayer: "PLAYER2",
          winningCells: checkWin(updatedGame.player2Turns)[1]
        },
      });
    }

    if( (updatedGame.player2Turns.length +updatedGame.player1Turns.length) === 9 ) {
      await User.updateOne({ _id: email2 }, { $inc: { draws: 1 } });
      await User.updateOne({ _id: email1 }, { $inc: { draws: 1 } });
      return res.status(200).json({
        status: "success",
        data: {
          nextPlayer,
          winningPlayer: "DRAW",
        },
      });
    }

  }

  res.status(200).json({
    status: "success",
    data: {
      nextPlayer,
      winningPlayer: "N/A",
    },
  });
});

module.exports = {
  gameInput,
};
