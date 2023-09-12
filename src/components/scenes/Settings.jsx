import React, {forwardRef, useContext} from 'react'
import './Settings.scss'
import PropTypes from 'prop-types'
import {
  constructClassString,
  filterCompletedQuickActions,
  getKeyBindForAction,
} from '../../utilities'
import TimeInput from '../utility/TimeInput'
import SettingsContext, {
  flushSettings,
  DefaultSettings,
} from '../../SettingsContext'
import {DefaultGame, flushGame} from '../../GameContext'
import Icon, {PLUS, CLOSE, STOPWATCH} from '../utility/Icon'
import {singleClickActions} from '../../constants/actions'
import QuickActionBind from './settings/QuickActionBind'
import TextCTA from '../utility/TextCTA'
import {v4 as uuid} from 'uuid'
import ActionKeyBind from './settings/ActionKeyBind'

const Settings = forwardRef(function Settings(props, ref) {
  const {
    periodLengthMS,
    shotClockMS,
    isSettingsPanelOpen,
    keyBindings,
    updateSettings,
    quickActions,
  } = useContext(SettingsContext)

  const filteredActions = Object.values(quickActions).filter(
    filterCompletedQuickActions,
  )

  /**
   * @param {QuickAction} a
   */
  const handleChangeQuickAction = a => {
    updateSettings({
      quickActions: {...quickActions, [a.id]: a},
    })
  }

  /**
   * @param {string} id
   */
  const removeQuickAction = id => {
    if (getKeyBindForAction(keyBindings, id)) {
      window.alert('You must unbind this action before removing it.')
      return
    }

    const clone = {...quickActions}
    delete clone[id]

    updateSettings({
      quickActions: clone,
    })
  }

  const resetToDefault = () => {
    flushGame(DefaultGame)
    flushSettings(DefaultSettings)
    window.location.reload()
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
        {Object.values(quickActions).map(qA => (
          <div className="quick-action-entry" key={qA.id}>
            <QuickActionBind value={qA} onChange={handleChangeQuickAction} />
            <Icon
              className="remove-quick-action-button"
              icon={CLOSE}
              onClick={() => removeQuickAction(qA.id)}
            />
          </div>
        ))}
        <TextCTA
          icon={PLUS}
          onClick={() => handleChangeQuickAction({id: uuid()})}
          label={'Create new quick action'}
        />
      </div>

      <div className="section">
        <h3>Key Bindings</h3>
        {singleClickActions.map(action => (
          <ActionKeyBind key={action} actionId={action} />
        ))}
        {filteredActions.length > 0 && (
          <React.Fragment>
            <hr />
            <h4>Key Bind Quick Links</h4>
            {filteredActions.map(quickAction => (
              <ActionKeyBind key={quickAction.id} actionId={quickAction.id} />
            ))}
          </React.Fragment>
        )}
      </div>

      <button id="reset-all-settings" onClick={resetToDefault}>
        Reset to Default
      </button>
    </div>
  )
})

Settings.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Settings
