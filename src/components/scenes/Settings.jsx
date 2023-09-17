import React, {forwardRef, useContext} from 'react'
import './Settings.scss'
import PropTypes from 'prop-types'
import {constructClassString} from '../../utilities'
import Icon, {CLOSE} from '../utility/Icon'
import PresetSelector from './settings/PresetSelector'
import EditQuickActions from './settings/EditQuickActions'
import EditKeyBindings from './settings/EditKeyBindings'
import EditGameSettings from './settings/EditGameSettings'
import SessionContext from '../../contexts/SessionContext'

const Settings = forwardRef(function Settings(props, ref) {
  const {isSettingsPanelOpen, updateSession} = useContext(SessionContext)
  return (
    <div
      ref={ref}
      className={constructClassString('settings-container', {
        open: isSettingsPanelOpen,
      })}>
      <Icon
        icon={CLOSE}
        className="close-icon"
        onClick={() => updateSession({isSettingsPanelOpen: false})}
      />
      <h2>Settings</h2>

      <div className="section">
        <h3>Game</h3>
        <EditGameSettings />
      </div>

      <div className="section">
        <h3>Custom Actions</h3>
        <EditQuickActions />
      </div>

      <div className="section">
        <h3>Key Bindings</h3>
        <EditKeyBindings />
      </div>

      <div className="section">
        <h3>Presets</h3>
        <PresetSelector />
      </div>
    </div>
  )
})

Settings.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default Settings
