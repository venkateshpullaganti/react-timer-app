import { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./App.css";
import "./index.css";

const ariaLabel = { "aria-label": "description" };
function App() {
  const [secondsLeft, setSecondsLeft] = useState(0);

  const [minutes, setMinutes] = useState(3);

  const timeRef = useRef(null);

  useEffect(() => {
    if (secondsLeft === 0) clearCurrentInterval(timeRef.current);
  }, [secondsLeft]);

  useEffect(() => {
    return () => {
      clearCurrentInterval();
    };
  }, []);

  const clearCurrentInterval = () => {
    if (timeRef.current) clearInterval(timeRef.current);
  };

  const startInterval = () => {
    clearCurrentInterval();
    timeRef.current = setInterval(() => {
      setSecondsLeft(state => state - 1);
    }, 1000);
  };

  const startTimer = () => {
    setSecondsLeft(minutes * 60);
    startInterval();
  };

  const resetTimer = () => {
    clearCurrentInterval();

    setSecondsLeft(minutes * 60);
  };

  const pauseTimer = () => {
    clearCurrentInterval();
  };

  const continueTimer = () => {
    if (secondsLeft) startInterval();
  };

  const updateMinutes = e => {
    setMinutes(e.target.value);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) startTimer();
  };

  return (
    <div className="App">
      <div className="timer-count">{secondsLeft}</div>

      <div className="text-input-label">
        <label htmlFor="standard-basic" className="input-label">
          Enter Time In Minutes:{" "}
        </label>
        <TextField
          placeholder="Enter Time In Minutes"
          focused
          defaultValue={minutes}
          inputProps={ariaLabel}
          type="number"
          onChange={updateMinutes}
          onKeyDown={onKeyDown}
          variant="standard"
          id="standard-basic"
          step="0.01"
        />
      </div>

      <div>
        <Button
          variant="outlined"
          className="btn"
          onClick={startTimer}
          color="success"
        >
          Start
        </Button>

        <Button
          variant="outlined"
          className="btn"
          onClick={pauseTimer}
          color="warning"
        >
          Pause
        </Button>

        <Button
          variant="outlined"
          className="btn"
          onClick={continueTimer}
          color="info"
        >
          Continue
        </Button>

        <Button
          variant="outlined"
          className="btn"
          onClick={resetTimer}
          color="error"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default App;
