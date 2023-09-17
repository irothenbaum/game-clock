import React, {useContext} from 'react'
import KeyBind from './KeyBind'
import PropTypes from 'prop-types'
import {actionLabels} from '../../../constants/actions'
import {getKeyBindForAction} from '../../../utilities'
import SettingsContext from '../../../contexts/SettingsContext'

function ActionKeyBind(props) {
  const {keyBindings, updateSettings, quickActions} =
    useContext(SettingsContext)

  const label =
    actionLabels[props.actionId] || quickActions[props.actionId]?.label
  const key = getKeyBindForAction(keyBindings, props.actionId)

  /**
   * @param {string} key
   */
  const updateKeyBinding = key => {
    if (key && keyBindings[key] && keyBindings[key] !== props.actionId) {
      throw new Error(`Key ${key} is already bound to action ${label}`)
    }

    const clone = {...keyBindings}

    // always remove the old binding
    const existing = getKeyBindForAction(keyBindings, props.actionId)
    delete clone[existing]

    if (key) {
      clone[key] = props.actionId
    } else {
      delete clone[key]
    }

    updateSettings({
      keyBindings: clone,
    })
  }

  return <KeyBind label={label} value={key} onChange={updateKeyBinding} />
}

ActionKeyBind.propTypes = {
  actionId: PropTypes.string.isRequired,
}

export default ActionKeyBind
