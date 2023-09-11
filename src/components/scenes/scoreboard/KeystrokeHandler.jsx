import React, {useContext, useEffect} from 'react'
import SettingsContext from '../../../SettingsContext'
import useActions from '../../../hooks/useActions'
import {keyBindingPropToQuickActionIndex} from '../../../utilities'

function KeystrokeHandler(props) {
  const {keyBindings, quickActions, isSettingsPanelOpen, updateSettings} =
    useContext(SettingsContext)
  const {execute} = useActions()

  useEffect(() => {
    const onKeyDown = e => {
      if (isSettingsPanelOpen) {
        return
      }

      const key = e.key
      const matching = Object.entries(keyBindings).find(([action, value]) => {
        return value === key
      })

      if (matching) {
        const quickActionIndex = keyBindingPropToQuickActionIndex(matching[0])
        if (quickActionIndex !== -1) {
          const action = quickActions[quickActionIndex]
          if (action) {
            execute(action.action, action.magnitude)
          } else {
            // action was not found - this can happen if a key binding was created but the quick action was deleted
            // NOTE: we attempt to handle this during hydration of SettingsContext so let's not overthink it here
          }
        } else {
          execute(matching[0])
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  return null
}

export default KeystrokeHandler
