import React, {useContext, useEffect} from 'react'
import SettingsContext from '../../../SettingsContext'
import useActions from '../../../hooks/useActions'

function KeystrokeHandler(props) {
  const {keyBindings, isSettingsPanelOpen} = useContext(SettingsContext)
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
        execute(matching[0])
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
