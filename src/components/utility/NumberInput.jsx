import React from 'react'
import PropTypes from 'prop-types'

function NumberInput(props) {
  return (
    <div className="number-input">
      <input
        type="number"
        min="0"
        max="99"
        value={props.value}
        onChange={e => props.onChange(parseInt(e.target.value || 0))}
      />
    </div>
  )
}

NumberInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NumberInput
