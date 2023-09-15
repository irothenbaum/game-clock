import Clock from './Clock'
import './GameAndShotClocks.scss'
import React, {useContext} from 'react'
import SettingsContext from '../../../SettingsContext'
import GameContext from '../../../GameContext'

function GameAndShotClocks(props) {
  const {shotClockMS, periodLengthMS} = useContext(SettingsContext)

  const {
    isGameClockRunning,
    gameClockRemaining,
    setGameClock,
    startGameClock,
    stopGameClock,

    isShotClockRunning,
    shotClockRemaining,
    startShotClock,
    stopShotClock,
    setShotClock,
  } = useContext(GameContext)

  return (
    <React.Fragment>
      <Clock
        isRunning={isGameClockRunning}
        className="game-clock"
        timeMS={gameClockRemaining}
        onChange={setGameClock}
        onStart={() => {
          // whenever the game clock starts or stop, so too does the shot clock
          startGameClock()
          startShotClock()
        }}
        onStop={() => {
          stopGameClock()
          stopShotClock()
        }}
        onReset={() => {
          // when we reset the game clock, we also stop it and reset and stop the shot clock
          stopGameClock()
          stopShotClock()
          setGameClock(periodLengthMS)
          setShotClock(shotClockMS)
        }}
      />
      <Clock
        isRunning={isShotClockRunning}
        className="shot-clock"
        timeMS={shotClockRemaining}
        hideMinutes={true}
        onChange={setShotClock}
        onStart={startShotClock}
        onStop={stopShotClock}
        onReset={() => setShotClock(shotClockMS)}
      />
    </React.Fragment>
  )
}

export default GameAndShotClocks
