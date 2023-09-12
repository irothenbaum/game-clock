import React, {useContext, forwardRef, useEffect} from 'react'
import './Scoreboard.scss'
import useIncrement from '../../hooks/useIncrement'
import Clock from './scoreboard/Clock'
import useClock from '../../hooks/useClock'
import GameContext from '../../GameContext'
import Scores from './scoreboard/Scores'
import SettingsContext from '../../SettingsContext'
import KeystrokeHandler from './scoreboard/KeystrokeHandler'
import QuickActions from './scoreboard/QuickActions'

const Scoreboard = forwardRef(function Scoreboard(props, ref) {
  const {shotClockMS, periodLengthMS} = useContext(SettingsContext)

  const {
    isRunning: isGameClockRunning,
    stopClock: stopGameClock,
    startClock: startGameClock,
    timeRemaining: gameClockRemaining,
    setClock: setGameClock,
  } = useClock(periodLengthMS)

  const {
    isRunning: isShotClockRunning,
    stopClock: stopShotClock,
    startClock: startShotClock,
    timeRemaining: shotClockRemaining,
    setClock: setShotClock,
  } = useClock(shotClockMS)

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

  // TODO: Trying to implement some local caching in case screen gets refreshed
  // useEffect(() => {
  //   const flushTimer = () => {
  //     flushGame({
  //       homeScore,
  //       visitorScore,
  //       shotClockRemaining,
  //       gameClockRemaining,
  //     })
  //
  //     // every 10 seconds
  //     setTimer('save-game-timer', flushTimer, 10000)
  //   }
  //
  //   flushTimer()
  // }, [])

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
      <div className="scoreboard" ref={ref}>
        <KeystrokeHandler />
        <Scores />
        <QuickActions />
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
            // when we reset the game clock, we also stop it
            stopGameClock()
            setGameClock(periodLengthMS)
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
      </div>
    </GameContext.Provider>
  )
})

Scoreboard.propTypes = {}

export default Scoreboard
