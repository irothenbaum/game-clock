import React, {useEffect, useRef, useState} from 'react'
import './GameClock.scss'
import Scoreboard from './scenes/Scoreboard'
import Settings from './scenes/Settings'
import SettingsContext, {
  HydratedSettings,
  flushSettings,
} from '../SettingsContext'
import GameContext, {flushGame} from '../GameContext'
import Icon, {SETTINGS} from './utility/Icon'
import {constructClassString} from '../utilities'
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

  const {
    isRunning: isGameClockRunning,
    stopClock: stopGameClock,
    startClock: startGameClock,
    timeRemaining: gameClockRemaining,
    setClock: setGameClock,
  } = useClock(settings.periodLengthMS)

  const {
    isRunning: isShotClockRunning,
    stopClock: stopShotClock,
    startClock: startShotClock,
    timeRemaining: shotClockRemaining,
    setClock: setShotClock,
  } = useClock(settings.shotClockMS)

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

  return (
    <div id="game-clock">
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
          <Scoreboard ref={scoreBoardRef} />
          <Icon
            icon={SETTINGS}
            className="settings-icon"
            onClick={() => updateSettings({isSettingsPanelOpen: true})}
          />
          <div
            className={constructClassString('settings-overlay', {
              open: settings.isSettingsPanelOpen,
            })}
            onClick={() => updateSettings({isSettingsPanelOpen: false})}
          />
          <Settings />
          <KeystrokeHandler />
          <QuickActions />
        </GameContext.Provider>
      </SettingsContext.Provider>
    </div>
  )
}

export default GameClock
