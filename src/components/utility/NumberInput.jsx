import React from 'react'
import PropTypes from 'prop-types'
import './NumberInput.scss'

function NumberInput(props) {
  return (
    <input
      type="numeric"
      id={props.id}
      value={('' + (props.value || 0)).padStart(2, '0')}
      onChange={e => props.onChange(parseInt(e.target.value || 0))}
    />
  )
}

NumberInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NumberInput
