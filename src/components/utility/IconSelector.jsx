import React from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import './IconSelector.scss'
import SelectInput from './SelectInput'

function IconSelector(props) {
  return (
    <SelectInput
      className="icon-selector"
      onChange={props.onChange}
      options={props.options}
      value={props.value}
      renderOption={(i, index) =>
        i ? <Icon key={index} icon={i} /> : <span>?</span>
      }
    />
  )
}

IconSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  options: PropTypes.array,
}

export default IconSelector
