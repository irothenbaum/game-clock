import React, {useContext} from 'react'
import './EditGameSettings.scss'
import TimeInput from '../../utility/TimeInput'
import SettingsContext from '../../../contexts/SettingsContext'

function EditGameSettings(props) {
  const {periodLengthMS, shotClockMS, updateSettings} =
    useContext(SettingsContext)

  return (
    <div className="edit-game-settings">
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
}

export default EditGameSettings
