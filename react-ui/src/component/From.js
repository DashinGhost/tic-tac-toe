import "./Form.css";
export default function Form({ startGameHandler, formData, changeHandler }) {
  return (
    <div className="App">
      <form className="form" onSubmit={startGameHandler}>
        <div className="players-form">
          <div className="player-form">
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
          </div>
          <div className="player-form">
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
          </div>
        </div>
        <button type="submit">START GAME</button>
      </form>
    </div>
  );
}
