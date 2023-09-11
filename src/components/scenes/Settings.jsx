import React, {forwardRef, useContext} from 'react'
import './Settings.scss'
import PropTypes from 'prop-types'
import {constructClassString} from '../../utilities'
import TimeInput from '../utility/TimeInput'
import SettingsContext from '../../SettingsContext'
import Icon, {CLOSE} from '../utility/Icon'

const Settings = forwardRef(function Settings(props, ref) {
  const {periodLengthMS, shotClockMS, updateSettings} =
    useContext(SettingsContext)

  return (
    <div
      ref={ref}
      className={constructClassString('settings-container', {
        open: props.isOpen,
      })}>
      <Icon icon={CLOSE} className="close-icon" onClick={props.onClose} />
      <h2>Settings</h2>

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
  )
})

Settings.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Settings
