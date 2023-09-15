import React from 'react'
import {
  allPresets,
  PRESET_Basketball,
  PRESET_Water_Polo,
  presetToLabel,
  presetToSettings,
} from '../../../constants/settingPresets'
import TextCTA from '../../utility/TextCTA'
import {BASKETBALL, CHECK, WATER_POLO} from '../../utility/Icon'
import {DefaultGame, flushGame} from '../../../GameContext'
import SettingsContext, {
  flushSettings,
  DefaultSettings,
} from '../../../SettingsContext'

const presetToIcon = {
  [PRESET_Basketball]: BASKETBALL,
  [PRESET_Water_Polo]: WATER_POLO,
}

function PresetSelector(props) {
  /**
   * @param {*} settings
   */
  const resetToDefault = (settings = DefaultSettings) => {
    flushGame(DefaultGame)
    flushSettings(settings)
    window.location.reload()
  }

  return (
    <div>
      {allPresets.map(k => {
        const label = presetToLabel[k]
        const preset = presetToSettings[k]

        return (
          <TextCTA
            key={label}
            icon={presetToIcon[k] || CHECK}
            onClick={() => resetToDefault(preset)}
            label={label}
          />
        )
      })}
    </div>
  )
}

export default PresetSelector
