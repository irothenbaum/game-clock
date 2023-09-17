import React, {useContext} from 'react'
import './QuickActions.scss'
import SettingsContext from '../../../contexts/SettingsContext'
import Icon from '../../utility/Icon'
import useActions from '../../../hooks/useActions'
import {filterCompletedQuickActions} from '../../../utilities'
import ToolTip, {ANCHOR_TOP} from '../../utility/ToolTip'

function QuickActions(props) {
  const {quickActions} = useContext(SettingsContext)
  const {execute} = useActions()

  const filteredActions = Object.values(quickActions).filter(
    filterCompletedQuickActions,
  )

  return (
    <div className="quick-actions">
      {filteredActions.map((qA, index) => (
        <ToolTip
          anchor={ANCHOR_TOP}
          key={index}
          label={qA.label}
          className="quick-action"
          onClick={() => execute(qA.action, qA.magnitude)}>
          <Icon icon={qA.icon} />
        </ToolTip>
      ))}
    </div>
  )
}

QuickActions.propTypes = {}

export default QuickActions
