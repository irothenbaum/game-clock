import React, {useContext, useState} from 'react'
import './PresetSelector.scss'
import {
  allPresets,
  PRESET_Basketball,
  PRESET_Water_Polo,
  presetToLabel,
  presetToSettings,
} from '../../../constants/settingPresets'
import Icon, {BASKETBALL, CHECK, CLOSE, WATER_POLO} from '../../utility/Icon'
import {DefaultGame, flushGame} from '../../../contexts/GameContext'
import SettingsContext, {
  flushSettings,
  DefaultSettings,
} from '../../../contexts/SettingsContext'
import {v4 as uuid} from 'uuid'
import SessionContext from '../../../contexts/SessionContext'
import PropTypes from 'prop-types'
import Button from '../../utility/Button'
import {constructClassString} from '../../../utilities'
import Modal from '../../utility/Modal'
import IconSelector from '../../utility/IconSelector'
import StringInput from '../../utility/StringInput'

const presetToIcon = {
  [PRESET_Basketball]: BASKETBALL,
  [PRESET_Water_Polo]: WATER_POLO,
}

function PresetItem(props) {
  const hasDelete = typeof props.onDelete === 'function'

  return (
    <div
      className={constructClassString('preset-item', {
        'has-delete': hasDelete,
      })}>
      <Icon icon={props.icon} className="preset-icon" />
      {hasDelete && (
        <Icon icon={CLOSE} className="delete-preset" onClick={props.onDelete} />
      )}
      <p>{props.label}</p>
      <Button onClick={props.onClick} title={'Apply'} />
    </div>
  )
}

PresetItem.propTypes = {
  icon: PropTypes.any,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
}

function PresetSelector(props) {
  const [showModal, setShowModal] = useState(false)
  const [icon, setIcon] = useState(null)
  const [label, setLabel] = useState('')

  /** @type {SessionContextData} */
  const {presetGameSettings, updateSession} = useContext(SessionContext)
  const {periodLengthMS, shotClockMS, keyBindings, quickActions} =
    useContext(SettingsContext)

  const customPresetIds = Object.keys(presetGameSettings)

  /**
   * @param {*} settings
   */
  const resetToDefault = (settings = DefaultSettings) => {
    flushGame(DefaultGame)
    flushSettings(settings)
    window.location.reload()
  }

  const handleSavePreset = () => {
    if (!label || !icon) {
      return
    }
    const newId = uuid()
    updateSession({
      presetGameSettings: {
        ...presetGameSettings,
        [newId]: {
          id: newId,
          name: label,
          icon,
          settings: {
            periodLengthMS,
            shotClockMS,
            keyBindings,
            quickActions,
          },
        },
      },
    })
  }

  const handleDeletePreset = id => {
    if (
      window.confirm('Are you sure you want to delete this preset?') === false
    ) {
      return
    }
    const clone = {...presetGameSettings}
    delete clone[id]
    updateSession({
      presetGameSettings: clone,
    })
  }

  return (
    <div className="preset-selector">
      {allPresets.map(k => {
        const label = presetToLabel[k]
        const preset = presetToSettings[k]

        return (
          <PresetItem
            key={k}
            label={label}
            icon={presetToIcon[k]}
            onClick={() => resetToDefault(preset)}
          />
        )
      })}
      <hr />
      <h4>Custom Presets</h4>
      {customPresetIds.length > 0 ? (
        customPresetIds.map(id => {
          return (
            <PresetItem
              key={id}
              icon={presetGameSettings[id].icon}
              label={presetGameSettings[id].name}
              onDelete={() => handleDeletePreset(id)}
              onClick={() => resetToDefault(presetGameSettings[id].settings)}
            />
          )
        })
      ) : (
        <p>You don't have any custom presets yet.</p>
      )}

      <Button
        className="save-current-settings"
        title="Save current settings as preset"
        onClick={() => setShowModal(true)}
      />

      <Modal onClose={() => setShowModal(false)} isOpen={showModal}>
        <h3>Save current settings as preset</h3>
        <div className="save-preset-input">
          <IconSelector onChange={setIcon} value={icon} />
          <StringInput
            onChange={setLabel}
            value={label}
            placeholder="Preset name"
          />
        </div>
        <Button
          disabled={!label || !icon}
          className="save-preset-cta"
          title={'Save'}
          onClick={handleSavePreset}
        />
      </Modal>
    </div>
  )
}

export default PresetSelector
