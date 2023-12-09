import axios from "axios";
import { useState } from "react";

export default function ({ ind, gameId, setCurrentPlayer, formData, startTime, setWinner, winner }) {
    
  const [cellState, setCellState] = useState('UNSET');
  const onClickHandler = (position) => {
    console.log(position);
    axios
      .post("http://localhost:3001/input", { gameId, input: position, ...formData})
      .then((res) => {
        console.log('Input RES:', res);
        const { nextPlayer, winningPlayer } = res.data.data;
        setWinner(winningPlayer);
        if(nextPlayer === 'PLAYER2') {
          setCellState('CROSS');
        }else {
          setCellState('CIRCLE');
        }
        setCurrentPlayer(nextPlayer);
      })
      .catch((err) => console.log("err:", err));
  };

  return (
    <div className="cell" onClick={ (cellState==='UNSET' && winner==='N/A') ? ((event) => onClickHandler([ind[0], ind[1]])) : (() => {})}>
      <p>
        {/* [{ind[0]}, {ind[1]}] */}
        {cellState === 'CROSS'? 'X' : (cellState === 'CIRCLE'? 'O' : '')}
      </p>
    </div>
  );
}
