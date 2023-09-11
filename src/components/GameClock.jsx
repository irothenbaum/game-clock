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
  const updateSettings = obj => {
    setSettings(s => {
      const updatedValue = {...s, ...obj}
      flushSettings(updatedValue)
      return updatedValue
    })
  }

  return (
    <div id="game-clock">
      <SettingsContext.Provider
        value={{
          ...settings,
          updateSettings: updateSettings,
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
      </SettingsContext.Provider>
    </div>
  )
}

export default GameClock
