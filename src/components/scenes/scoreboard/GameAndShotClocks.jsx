import Clock from './Clock'
import './GameAndShotClocks.scss'
import React, {useContext, useEffect} from 'react'
import SettingsContext from '../../../contexts/SettingsContext'
import GameContext from '../../../contexts/GameContext'

function GameAndShotClocks(props) {
  const {shotClockMS, periodLengthMS} = useContext(SettingsContext)

  const {
    isGameClockRunning,
    gameClockRemaining,
    isGameClockExpired,
    setGameClock,
    startGameClock,
    stopGameClock,

    isShotClockRunning,
    shotClockRemaining,
    isShotClockExpired,
    startShotClock,
    stopShotClock,
    setShotClock,
  } = useContext(GameContext)

  useEffect(() => {
    // once the game clock expires, the shot clock drops to 0
    if (isGameClockExpired) {
      setShotClock(shotClockMS)
    }
  }, [isGameClockExpired])

  return (
    <React.Fragment>
      <Clock
        label={'Period time'}
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
        label={'Shot clock'}
        isRunning={isShotClockRunning}
        className="shot-clock"
        // if game time < shot clock, shot clock mirrors game time
        timeMS={Math.min(shotClockRemaining, gameClockRemaining)}
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
