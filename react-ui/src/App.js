import { useEffect, useState } from "react";
import "./App.css";
import Cell from "./component/cell";
import axios from "axios";//

function App() {
  const [winner, setWinner] = useState("N/A");
  const [startTime, setStartTime] = useState(0);
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
  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://localhost:3001/usersdata?email1=${formData.email1}&email2=${formData.email2}`
  //     )
  //     .then((res) => {
  //       console.log("UD:", res);
  //       setGameStats(res);
  //     })
  //     .catch((err) => console.log("ERR USERDATA FETCH:", err));
  // }, [formData]);

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
      cells.push(
        <Cell
          key={i + "" + j}
          ind={[i, j]}
          gameId={gameId}
          formData={formData}
          setCurrentPlayer={setCurrentPlayer}
          setWinner={setWinner}
          winner={winner}
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
        setStartTime(time);
        axios
          .get(
            `http://localhost:3001/usersdata?email1=${formData.email1}&email2=${formData.email2}`
          )
          .then((res) => {
            console.log("UD:", res);
            if(res.data)
              setGameStats(res.data.data);
          })
          .catch((err) => console.log("ERR USERDATA FETCH:", err));
      })
      .catch((err) => console.log("err:", err));
    setGameStatus("STARTED");
  }
  if (gameStatus === "NOT SARTED") {
    return (
      <div className="App">
        <form className="form" onSubmit={startGameHandler}>
          PLAYER 1
          <label>
            name:{" "}
            <input
              type="text"
              name="name1"
              value={formData.name1}
              onChange={changeHandler}
            ></input>
          </label>
          <label>
            email:{" "}
            <input
              type="text"
              name="email1"
              value={formData.email1}
              onChange={changeHandler}
            ></input>
          </label>
          PLAYER 2
          <label>
            name:{" "}
            <input
              type="text"
              name="name2"
              value={formData.name2}
              onChange={changeHandler}
            ></input>
          </label>
          <label>
            email:{" "}
            <input
              type="text"
              name="email2"
              value={formData.email2}
              onChange={changeHandler}
            ></input>
          </label>
          <button type="submit">START GAME</button>
        </form>
      </div>
    );
  }
  return (
    <div className="App">
      <p>TIC-TAC-TOE</p>
      <p>
        PLAYER1: {formData.name1} WINS: {gameStats.user1 ? gameStats.user1.wins : 0} LOOSES: {gameStats.user1 ? gameStats.user1.looses : 0} TOTAL GAMES:  {gameStats.user1 ? gameStats.user1.totalGames : 0}      V/S       PLAYER2: {formData.name2}WINS: {gameStats.user2 ? gameStats.user2.wins : 0} LOOSES: {gameStats.user2 ? gameStats.user2.looses : 0} TOTAL GAMES:  {gameStats.user2 ? gameStats.user2.totalGames : 0}{" "}
      </p>
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
