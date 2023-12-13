import React, { useState, useEffect } from 'react';
import './App.css';
import { IoPlayCircleSharp } from "react-icons/io5";

function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      const countdown = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(countdown);
          setIsPlaying(false);
        } else {
          if (seconds === 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isPlaying, minutes, seconds]);

  const startCountdown = () => {
    setIsPlaying(true);
  };

  const resetCountdown = () => {
    setIsPlaying(false);
    setMinutes(0);
    setSeconds(0);
  };

  const pauseCountdown = () => {
    setIsPlaying(false);
  };

  const handleMinutesChange = (event) => {
    const newMinutes = parseInt(event.target.value, 10);
    setMinutes(isNaN(newMinutes) ? 0 : newMinutes);
    setSeconds(0);
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="App">
      <div>

      
      <div className='min'>Enter Minutes</div>
      <input
        type="number"
        placeholder="Enter minutes"
        value={minutes}
        onChange={handleMinutesChange}
        disabled={isPlaying}
        className='input'
      />
      <div className='timing'>
      <IoPlayCircleSharp  className='iconPlay' width="40" height="40" 
      onClick={startCountdown} disabled={isPlaying}/>
      <div className="timer">{`${String(minutes).padStart(2, '0')}:${String(
        seconds).padStart(2, '0')}`}</div>

      </div>
      {/* <button onClick={startCountdown} disabled={isPlaying} className='play'>
        Play
      </button> */}
      <div className='buttons'>
      <button onClick={resetCountdown} disabled={!isPlaying && minutes === 0 && seconds === 0} 
      className='reset'>
        Reset
      </button>
      <button onClick={pauseCountdown} disabled={!isPlaying} className='pause'>
        Pause
      </button>
      </div>
      </div>
    </div>
  );
}

export default App;
