import React, {useState} from 'react'
import './KeyBind.scss'
import PropTypes from 'prop-types'

function KeyBind(props) {
  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = e => {
    if (e.key.length !== 1) {
      props.onChange(null)
      return
    }

    try {
      props.onChange(e.key)

      setIsFocused(false)
    } catch (e) {
      window.alert(e.message)
    }
    return false
  }

  return (
    <div className="key-bind">
      <label>
        {props.label}{' '}
        ............................................................................................
      </label>

      <input
        type="string"
        value={isFocused ? '' : props.value || ''}
        placeholder={isFocused ? '' : '-'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        onChange={() => {}}
      />
    </div>
  )
}

KeyBind.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

export default KeyBind
