import React, {useContext, useEffect} from 'react'
import SettingsContext from '../../../contexts/SettingsContext'
import useActions from '../../../hooks/useActions'
import {singleClickActions} from '../../../constants/actions'
import SessionContext from '../../../contexts/SessionContext'

function KeystrokeHandler(props) {
  const {isSettingsPanelOpen, updateSession} = useContext(SessionContext)
  const {keyBindings, quickActions, updateSettings} =
    useContext(SettingsContext)
  const {execute} = useActions()

  useEffect(() => {
    const onKeyDown = e => {
      if (isSettingsPanelOpen) {
        if (e.key === 'Escape') {
          updateSession({isSettingsPanelOpen: false})
        }
        return
      }

      const macro = keyBindings[e.key]

      // if this key is bound to a macro
      if (macro) {
        if (singleClickActions.includes(macro)) {
          // if the marco is a single click action, execute it immediately
          execute(macro)
        } else if (quickActions[macro]) {
          // if the macros is pointing to a quick action, execute the quick action
          execute(quickActions[macro].action, quickActions[macro].magnitude)
        } else {
          // action was not found - this can happen if a key binding was created but the quick action was deleted
          // NOTE: we attempt to prevent this when the user deletes a quick action that has a keybinding, but just in case
          // we're going to remove the keybinding here
          updateSettings({keyBindings: {...keyBindings, [e.key]: null}})
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
