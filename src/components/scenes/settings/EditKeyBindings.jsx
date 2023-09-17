import React, {useContext} from 'react'
import './EditKeyBindings.scss'
import {singleClickActions} from '../../../constants/actions'
import ActionKeyBind from './ActionKeyBind'
import {filterCompletedQuickActions} from '../../../utilities'
import SettingsContext from '../../../contexts/SettingsContext'

function EditKeyBindings(props) {
  const {quickActions} = useContext(SettingsContext)

  const filteredActions = Object.values(quickActions).filter(
    filterCompletedQuickActions,
  )

  return (
    <div className="edit-key-bindings">
      {singleClickActions.map(action => (
        <ActionKeyBind key={action} actionId={action} />
      ))}
      {filteredActions.length > 0 && (
        <React.Fragment>
          <hr />
          <h4>Key Bind Custom Action</h4>
          {filteredActions.map(quickAction => (
            <ActionKeyBind key={quickAction.id} actionId={quickAction.id} />
          ))}
        </React.Fragment>
      )}
    </div>
  )
}

export default EditKeyBindings
