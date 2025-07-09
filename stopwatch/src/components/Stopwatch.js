import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Stopwatch.css';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time]);
    }
  };

  const formatTime = (timeInMs) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const milliseconds = Math.floor((timeInMs % 1000) / 10);

    return {
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
      milliseconds: milliseconds.toString().padStart(2, '0')
    };
  };

  const { minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="stopwatch">
      <motion.div 
        className="stopwatch-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="title">스톱워치</h1>
        
        <div className="time-display">
          <div className="time-unit">
            <span className="time-number">{minutes}</span>
            <span className="time-label">분</span>
          </div>
          
          <span className="time-separator">:</span>
          
          <div className="time-unit">
            <span className="time-number">{seconds}</span>
            <span className="time-label">초</span>
          </div>
          
          <span className="time-separator">:</span>
          
          <div className="time-unit milliseconds">
            <span className="time-number">{milliseconds}</span>
            <span className="time-label">밀리초</span>
          </div>
        </div>

        <div className="controls">
          <motion.button
            className={`control-btn ${isRunning ? 'stop' : 'start'}`}
            onClick={startStop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {isRunning ? '정지' : '시작'}
          </motion.button>
          
          <motion.button
            className="control-btn reset"
            onClick={reset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            리셋
          </motion.button>
          
          <motion.button
            className="control-btn lap"
            onClick={addLap}
            disabled={!isRunning}
            whileHover={{ scale: isRunning ? 1.05 : 1 }}
            whileTap={{ scale: isRunning ? 0.95 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            랩
          </motion.button>
        </div>

        {laps.length > 0 && (
          <motion.div 
            className="laps-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="laps-title">랩 기록</h3>
            <div className="laps-list">
              {laps.map((lap, index) => {
                const lapTime = formatTime(lap);
                return (
                  <motion.div
                    key={index}
                    className="lap-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="lap-number">랩 {laps.length - index}</span>
                    <span className="lap-time">
                      {lapTime.minutes}:{lapTime.seconds}.{lapTime.milliseconds}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Stopwatch; 