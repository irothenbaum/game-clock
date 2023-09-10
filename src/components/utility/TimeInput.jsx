import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import NumberInput from './NumberInput'
import {timeMSToParts, timePartsToMS} from '../../utilities'
import Icon, {CHECK, CLOSE} from './Icon'

function TimeInput(props) {
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const [m, s] = timeMSToParts(props.value || 0)
    setMinutes(m)
    setSeconds(s)
  }, [props.value])

  const handleSave = () => {
    props.onChange(timePartsToMS(minutes, seconds))
  }

  return (
    <div className="time-input">
      <NumberInput value={minutes} onChange={setMinutes} />
      <span>:</span>
      <NumberInput value={seconds} onChange={setSeconds} />

      <Icon icon={CHECK} onClick={handleSave} />
    </div>
  )
}

TimeInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
}

export default TimeInput
