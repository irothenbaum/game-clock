import React, {useEffect, useRef, useState} from 'react'
import './GameClock.scss'
import Scoreboard from './scenes/Scoreboard'
import Settings from './scenes/Settings'
import SettingsContext, {
  HydratedSettings,
  flushSettings,
} from '../contexts/SettingsContext'
import SessionContext, {
  HydratedSession,
  flushSession,
} from '../contexts/SessionContext'
import GameContext, {HydratedGame} from '../contexts/GameContext'
import useClock from '../hooks/useClock'
import useIncrement from '../hooks/useIncrement'
import KeystrokeHandler from './scenes/scoreboard/KeystrokeHandler'
import QuickActions from './scenes/scoreboard/QuickActions'

function GameClock(props) {
  const [settings, setSettings] = useState(HydratedSettings)
  const scoreBoardRef = useRef()
  const updateSettings = obj => {
    setSettings(s => {
      const updatedValue = {...s, ...obj}
      flushSettings(updatedValue)
      return updatedValue
    })
  }

  const [session, setSession] = useState(HydratedSession)
  const updateSession = obj => {
    setSession(s => {
      const updatedValue = {...s, ...obj}
      flushSession(updatedValue)
      return updatedValue
    })
  }

  const {
    isRunning: isGameClockRunning,
    stopClock: stopGameClock,
    startClock: startGameClock,
    timeRemaining: gameClockRemaining,
    isTimeExpired: isGameClockExpired,
    setClock: setGameClock,
  } = useClock(settings.periodLengthMS)

  const {
    isRunning: isShotClockRunning,
    stopClock: stopShotClock,
    startClock: startShotClock,
    timeRemaining: shotClockRemaining,
    isTimeExpired: isShotClockExpired,
    setClock: setShotClock,
  } = useClock(settings.shotClockMS)

  const {
    value: homeScore,
    setValue: setHomeScore,
    change: changeHomeScore,
  } = useIncrement(HydratedGame.homeScore)

  const {
    value: visitorScore,
    setValue: setVisitorScore,
    change: changeVisitorScore,
  } = useIncrement(HydratedGame.visitorScore)

  const {
    value: period,
    setValue: setPeriod,
    change: changePeriod,
  } = useIncrement(HydratedGame.period)

  return (
    <div id="game-clock">
      <SessionContext.Provider
        value={{
          ...session,
          updateSession: updateSession,
        }}>
        <SettingsContext.Provider
          value={{
            ...settings,
            updateSettings: updateSettings,
          }}>
          <GameContext.Provider
            value={{
              isGameClockRunning,
              stopGameClock,
              startGameClock,
              gameClockRemaining,
              isGameClockExpired,
              setGameClock,

              isShotClockRunning,
              stopShotClock,
              startShotClock,
              shotClockRemaining,
              isShotClockExpired,
              setShotClock,

              homeScore,
              setHomeScore,
              changeHomeScore,
              visitorScore,
              setVisitorScore,
              changeVisitorScore,

              period,
              setPeriod,
              changePeriod,
            }}>
            <Scoreboard ref={scoreBoardRef} />
            <Settings />
            <KeystrokeHandler />
            <QuickActions />
          </GameContext.Provider>
        </SettingsContext.Provider>
      </SessionContext.Provider>
    </div>
  )
}

export default GameClock
