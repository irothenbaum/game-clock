import React, {useContext} from 'react'
import './QuickActions.scss'
import SettingsContext from '../../../SettingsContext'
import Icon from '../../utility/Icon'
import useActions from '../../../hooks/useActions'
import {filterCompletedQuickActions} from '../../../utilities'

function QuickActions(props) {
  const {quickActions} = useContext(SettingsContext)
  const {execute} = useActions()

  const filteredActions = Object.values(quickActions).filter(
    filterCompletedQuickActions,
  )

  return (
    <div className="quick-actions">
      {filteredActions.map((qA, index) => (
        <div title={qA.label} key={index} className="quick-action">
          <Icon
            icon={qA.icon}
            onClick={() => execute(qA.action, qA.magnitude)}
          />
        </div>
      ))}
    </div>
  )
}

QuickActions.propTypes = {}

export default QuickActions
