import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './Clock.scss'
import {constructClassString, timeMSToParts} from '../../utilities'
import Icon, {PLAY, EDIT, STOP, RESET} from '../utility/Icon'
import TimeInput from '../utility/TimeInput'

/**
 * @param {number} num
 * @return {string}
 */
function zeroPad(num) {
  return ('' + num).padStart(2, '0')
}

function Clock(props) {
  const [minutes, seconds, milliseconds] = timeMSToParts(props.timeMS)
  const [cachedTime, setCachedTime] = useState(null)
  // show MS if we're under 10 seconds left
  const showMilliseconds = props.timeMS < 10000

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (isEditing) {
      setCachedTime(props.timeMS)
    } else {
      setCachedTime(null)
    }
  }, [isEditing])

  return (
    <div className={constructClassString('clock', props.className)}>
      {!props.hideMinutes && (
        <span
          className={constructClassString({
            disabled: minutes === 0,
          })}>
          <span className="minutes">{zeroPad(minutes)}</span>
          <span className="colon">:</span>
        </span>
      )}
      <span className="seconds">{zeroPad(seconds)}</span>
      {showMilliseconds && (
        <React.Fragment>
          <span className="period">.</span>
          <span className="milliseconds">{zeroPad(milliseconds)}</span>
        </React.Fragment>
      )}

      <div className="clock-controls">
        <span>
          <Icon icon={RESET} onClick={props.onReset} />
        </span>
        <span className="playback-controls">
          <Icon icon={PLAY} onClick={props.onStart} />
          <Icon icon={STOP} onClick={props.onStop} />
        </span>
        <span>
          <Icon icon={EDIT} onClick={() => setIsEditing(true)} />
        </span>
        <div
          className={constructClassString('edit-clock', {
            open: isEditing,
          })}>
          <TimeInput
            value={cachedTime}
            onChange={v => {
              props.onChange(v)
              setIsEditing(false)
            }}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    </div>
  )
}

Clock.propTypes = {
  timeMS: PropTypes.number.isRequired,
  hideMinutes: PropTypes.bool,
  className: PropTypes.string,

  onReset: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onChange: PropTypes.func,
}

export default Clock
