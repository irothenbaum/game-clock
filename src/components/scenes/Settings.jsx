import React, {forwardRef, useContext} from 'react'
import './Settings.scss'
import PropTypes from 'prop-types'
import {constructClassString} from '../../utilities'
import TimeInput from '../utility/TimeInput'
import SettingsContext from '../../SettingsContext'
import Icon, {PLUS, CLOSE, STOPWATCH} from '../utility/Icon'
import {
  ACTION_SET_GAME_CLOCK,
  actionLabels,
  singleClickActions,
} from '../../constants/actions'
import KeyBind from './settings/KeyBind'
import QuickActionBind from './settings/QuickActionBind'
import TextCTA from '../utility/TextCTA'

const Settings = forwardRef(function Settings(props, ref) {
  const {
    periodLengthMS,
    shotClockMS,
    isSettingsPanelOpen,
    keyBindings,
    updateSettings,
    quickActions,
  } = useContext(SettingsContext)

  /**
   * @param {string} action
   * @param {string} key
   */
  const updateKeyBinding = (action, key) => {
    const duplicates = Object.entries(keyBindings).filter(([a, v]) => v === key)
    if (
      key &&
      duplicates.length > 0 &&
      (duplicates.length > 1 || duplicates[0][0] !== action)
    ) {
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

  /**
   * @param {QuickAction} a
   * @param {number} index
   */
  const handleChangeQuickAction = (a, index) => {
    const clone = [...quickActions]
    clone[index] = a
    updateSettings({
      quickActions: clone,
    })
  }

  /**
   * @param {number} index
   */
  const removeQuickAction = index => {
    const clone = [...quickActions]
    clone.splice(index, 1)
    updateSettings({
      quickActions: clone,
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
        <h3>Quick Links</h3>
        {quickActions.map((action, index) => {
          return (
            <div
              className="quick-action-entry"
              key={`${action.label}-${index}`}>
              <QuickActionBind
                value={action}
                onChange={a => handleChangeQuickAction(a, index)}
              />
              <Icon
                className="remove-quick-action-button"
                icon={CLOSE}
                onClick={() => removeQuickAction(index)}
              />
            </div>
          )
        })}
        <TextCTA
          icon={PLUS}
          onClick={() => handleChangeQuickAction({}, quickActions.length)}
          label={'Create new quick action'}
        />
      </div>

      <div className="section">
        <h3>Key Bindings</h3>
        {singleClickActions.map(action => {
          return (
            <KeyBind
              key={action}
              label={actionLabels[action]}
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
