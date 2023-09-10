import React from 'react'
import './Scoreboard.scss'
import TeamScore from '../scoreboard/TeamScore'
import useIncrement from '../../hooks/useIncrement'
import Clock from '../scoreboard/Clock'
import useClock from '../../hooks/useClock'
import GameContext from '../../GameContext'
import Scores from '../scoreboard/Scores'

function Scoreboard(props) {
  const {
    isRunning: isGameClockRunning,
    stopClock: stopGameClock,
    startClock: startGameClock,
    timeRemaining: gameClockRemaining,
    setClock: setGameClock,
  } = useClock()

  const {
    isRunning: isShotClockRunning,
    stopClock: stopShotClock,
    startClock: startShotClock,
    timeRemaining: shotClockRemaining,
    setClock: setShotClock,
  } = useClock()

  const {
    value: homeScore,
    setValue: setHomeScore,
    change: changeHomeScore,
  } = useIncrement(0)

  const {
    value: visitorScore,
    setValue: setVisitorScore,
    change: changeVisitorScore,
  } = useIncrement(0)

  const handleResetGameClock = () => {}

  const handleResetShotClock = () => {}

  return (
    <GameContext.Provider
      value={{
        isGameClockRunning,
        stopGameClock,
        startGameClock,
        gameClockRemaining,
        setGameClock,

        isShotClockRunning,
        stopShotClock,
        startShotClock,
        shotClockRemaining,
        setShotClock,

        homeScore,
        setHomeScore,
        changeHomeScore,
        visitorScore,
        setVisitorScore,
        changeVisitorScore,
      }}>
      <div className="scoreboard">
        <Scores />
        <Clock
          className="game-clock"
          timeMS={gameClockRemaining}
          onChange={setGameClock}
          onStart={startGameClock}
          onStop={stopGameClock}
          onReset={handleResetGameClock}
        />
        <Clock
          className="shot-clock"
          timeMS={shotClockRemaining}
          hideMinutes={true}
          onChange={setShotClock}
          onStart={startShotClock}
          onStop={stopShotClock}
          onReset={handleResetShotClock}
        />
      </div>
    </GameContext.Provider>
  )
}

Scoreboard.propTypes = {}

export default Scoreboard
