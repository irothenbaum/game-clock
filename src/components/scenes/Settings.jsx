import React, {forwardRef, useContext} from 'react'
import './Settings.scss'
import PropTypes from 'prop-types'
import {constructClassString} from '../../utilities'
import TimeInput from '../utility/TimeInput'
import SettingsContext from '../../SettingsContext'
import Icon, {CLOSE} from '../utility/Icon'
import {actionLabels} from '../../constants/keystrokes'
import KeyBind from './settings/KeyBind'

const Settings = forwardRef(function Settings(props, ref) {
  const {
    periodLengthMS,
    shotClockMS,
    isSettingsPanelOpen,
    keyBindings,
    updateSettings,
  } = useContext(SettingsContext)

  /**
   * @param {string} action
   * @param {string} key
   */
  const updateKeyBinding = (action, key) => {
    const duplicates = Object.entries(keyBindings).filter(([a, v]) => v === key)

    if (duplicates.length > 0) {
      throw new Error(
        `Key ${key} is already bound to action ${
          actionLabels[duplicates[0][0]]
        }`,
      )
    }

    const clone = {...keyBindings}
    clone[action] = key

    updateSettings({
      keyBindings: clone,
    })
  }

  return (
    <div
      ref={ref}
      className={constructClassString('settings-container', {
        open: isSettingsPanelOpen,
      })}>
      <Icon
        icon={CLOSE}
        className="close-icon"
        onClick={() => updateSettings({isSettingsPanelOpen: false})}
      />
      <h2>Settings</h2>

      <div className="section">
        <h3>Game</h3>
        <div className="row">
          <label>Period Length</label>
          <TimeInput
            value={periodLengthMS}
            onChange={v => updateSettings({periodLengthMS: v})}
            onCancel={v => updateSettings({periodLengthMS: periodLengthMS})}
          />
        </div>

        <div className="row">
          <label>Shot Clock</label>
          <TimeInput
            value={shotClockMS}
            onChange={v => updateSettings({shotClockMS: v})}
            onCancel={v => updateSettings({shotClockMS: shotClockMS})}
          />
        </div>
      </div>

      <div className="section">
        <h3>Key Bindings</h3>
        {Object.entries(actionLabels).map(([action, label]) => {
          return (
            <KeyBind
              key={action}
              label={label}
              value={keyBindings[action]}
              onChange={s => updateKeyBinding(action, s)}
            />
          )
        })}
      </div>
    </div>
  )
})

Settings.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Settings
