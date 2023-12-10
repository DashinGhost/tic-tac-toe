import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./component/Cell";
import axios from "axios";
import Form from "./component/From";

function App() {
  const [winner, setWinner] = useState("N/A");
  // const [startTime, setStartTime] = useState(0);
  const [winningCells, setWinningCells] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("PLAYER1");
  const [gameId, setGameId] = useState(null);
  const [gameStatus, setGameStatus] = useState("NOT SARTED");
  const [formData, setFormData] = useState({
    name1: "",
    email1: "",
    name2: "",
    email2: "",
  });
  const [gameStats, setGameStats] = useState({});
  const changeHandler = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  let cells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      console.log('WINNING CELLS:', winningCells);

      cells.push(
        <Cell
          addtionalCalss={winningCells.indexOf(i+''+j) != -1 ? `${winner}-cell` : ''}
          key={i + "" + j}
          ind={[i, j]}
          gameId={gameId}
          formData={formData}
          setCurrentPlayer={setCurrentPlayer}
          setWinner={setWinner}
          winner={winner}
          currentPlayer={currentPlayer}
          setWinningCells={setWinningCells}
        />
      );
    }
  }

  function startGameHandler() {
    console.log(formData);
    let time = Date.now();
    axios
      .post("http://localhost:3001/start", { startTime: time, ...formData })
      .then((res) => {
        console.log(res);
        const { gameId } = res.data.data;
        setGameId(gameId);
        // setStartTime(time);
        axios
          .get(
            `http://localhost:3001/usersdata?email1=${formData.email1}&email2=${formData.email2}`
          )
          .then((res) => {
            console.log("UD:", res);
            if (res.data) setGameStats(res.data.data);
          })
          .catch((err) => console.log("ERR USERDATA FETCH:", err));
      })
      .catch((err) => console.log("err:", err));
    setGameStatus("STARTED");
  }
  if (gameStatus === "NOT SARTED") {
    return (
      <Form
        startGameHandler={startGameHandler}
        formData={formData}
        changeHandler={changeHandler}
      />
    );
  }

  return (
    <div className="App">
      <p id='ttt'>TIC-TAC-TOE</p>
      <div id="player-info">
        <p>
          <div>PLAYER1: {formData.name1}</div>
          <div>
            WINS: {gameStats.user1 ? gameStats.user1.wins : 0} LOOSES:
            {gameStats.user1 ? gameStats.user1.looses : 0} TOTAL GAMES:
            {gameStats.user1 ? gameStats.user1.totalGames : 0}
          </div>
        </p>
        <p> V/S </p>
        <p>
          <div>PLAYER2: {formData.name2}</div>
          <div>
            WINS: {gameStats.user2 ? gameStats.user2.wins : 0} LOOSES:
            {gameStats.user2 ? gameStats.user2.looses : 0} TOTAL GAMES:
            {gameStats.user2 ? gameStats.user2.totalGames : 0}
          </div>
        </p>
      </div>
      <p>{currentPlayer}'s TURN</p>
      <div className="mainbox">{cells}</div>
      <p>
        {winner === "DRAW"
          ? "MATCH DRAWN"
          : winner === "PLAYER1" || winner === "PLAYER2"
          ? `WINNER IS ${winner}`
          : ""}
      </p>
    </div>
  );
}

export default App;
