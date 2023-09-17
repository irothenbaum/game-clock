import React from 'react'
import './QuickActionBind.scss'
import PropTypes from 'prop-types'
import IconSelector from '../../utility/IconSelector'
import StringInput from '../../utility/StringInput'
import SelectInput from '../../utility/SelectInput'
import NumberInput from '../../utility/NumberInput'
import {actionLabels, customizableActions} from '../../../constants/actions'

function QuickActionBind(props) {
  const value = props.value || {}

  return (
    <div className="quick-action-bind">
      <IconSelector
        value={value.icon}
        onChange={i => props.onChange({...value, icon: i})}
      />
      <StringInput
        onChange={l => props.onChange({...value, label: l})}
        value={value.label}
        placeholder={'Label'}
      />
      <SelectInput
        options={customizableActions}
        onChange={a => props.onChange({...value, action: a})}
        value={value.action}
        renderOption={a => actionLabels[a]}
      />
      <NumberInput
        onChange={m => props.onChange({...value, magnitude: m * 1000})}
        value={value.magnitude / 1000}
        placeholder={'Time in seconds'}
      />
    </div>
  )
}

QuickActionBind.propTypes = {
  value: PropTypes.shape({
    action: PropTypes.string,
    icon: PropTypes.any,
    label: PropTypes.string,
    magnitude: PropTypes.number,
  }),
  onChange: PropTypes.func.isRequired,
}

export default QuickActionBind
