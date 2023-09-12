import React, {useState} from 'react'
import './KeyBind.scss'
import PropTypes from 'prop-types'
import StringInput from '../../utility/StringInput'

const ignoredKeys = ['Tab']

function KeyBind(props) {
  const [isFocused, setIsFocused] = useState(false)

  const handleKeyDown = e => {
    // we allow this key to work as normal
    if (ignoredKeys.includes(e.key)) {
      return
    }

    e.preventDefault()

    if (e.key.length !== 1) {
      props.onChange(null)
      return
    }

    try {
      props.onChange(e.key.toLowerCase())

      setIsFocused(false)
    } catch (e) {
      window.alert(e.message)
    }
    return false
  }

  let value = props.value
  if (value && value.length > 0 && value.trim().length === 0) {
    value = '_'
  }

  return (
    <div className="key-bind">
      <label>
        {props.label}{' '}
        ............................................................................................
      </label>

      <StringInput
        value={isFocused ? '' : value || ''}
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
