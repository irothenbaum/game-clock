import React, {useContext} from 'react'
import './EditQuickActions.scss'
import QuickActionBind from './QuickActionBind'
import Icon, {CLOSE, PLUS} from '../../utility/Icon'
import TextCTA from '../../utility/TextCTA'
import {v4 as uuid} from 'uuid'
import {
  filterCompletedQuickActions,
  getKeyBindForAction,
} from '../../../utilities'
import SettingsContext from '../../../SettingsContext'

function EditQuickActions(props) {
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

  return (
    <div className="edit-quick-actions">
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
  )
}

export default EditQuickActions
