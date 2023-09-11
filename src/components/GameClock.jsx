import React, {useEffect, useRef, useState} from 'react'
import './GameClock.scss'
import Scoreboard from './scenes/Scoreboard'
import Settings from './scenes/Settings'
import SettingsContext, {
  HydratedSettings,
  flushSettings,
} from '../SettingsContext'
import Icon, {SETTINGS} from './utility/Icon'
import {constructClassString} from '../utilities'

function GameClock(props) {
  const [settings, setSettings] = useState(HydratedSettings)
  const scoreBoardRef = useRef()
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div id="game-clock">
      <SettingsContext.Provider
        value={{
          ...settings,
          updateSettings: obj => {
            console.log(obj)
            setSettings(s => {
              const updatedValue = {...s, ...obj}
              flushSettings(updatedValue)
              return updatedValue
            })
          },
        }}>
        <Scoreboard ref={scoreBoardRef} />
        <Icon
          icon={SETTINGS}
          className="settings-icon"
          onClick={() => setShowSettings(true)}
        />
        <div
          className={constructClassString('settings-overlay', {
            open: showSettings,
          })}
          onClick={() => setShowSettings(false)}
        />
        <Settings
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </SettingsContext.Provider>
    </div>
  )
}

export default GameClock
