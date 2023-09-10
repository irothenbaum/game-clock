import React, {useRef, useState} from 'react'
import './GameClock.scss'
import {SCENE_Scoreboard, SCENE_Settings} from '../constants/routes'
import Scoreboard from './scenes/Scoreboard'
import Settings from './scenes/Settings'
import SettingsContext, {
  HydratedSettings,
  flushSettings,
} from '../SettingsContext'

const SCENE_MAP = {
  [SCENE_Settings]: Settings,
  [SCENE_Scoreboard]: Scoreboard,
}

function GameClock(props) {
  const [settings, setSettings] = useState(HydratedSettings)
  const container = useRef()
  const [scene, setScene] = useState(SCENE_Scoreboard)

  const Page = SCENE_MAP[scene]

  return (
    <div id="game-clock" ref={container}>
      <SettingsContext.Provider
        value={{
          ...settings,
          updateSettings: obj =>
            setSettings(s => {
              const updatedValue = {...s, ...obj}
              flushSettings(updatedValue)
              return updatedValue
            }),
        }}>
        <Page onNavigate={setScene} />
      </SettingsContext.Provider>
    </div>
  )
}

export default GameClock
