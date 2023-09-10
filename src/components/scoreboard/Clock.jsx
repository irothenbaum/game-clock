import React from 'react'
import PropTypes from 'prop-types'
import './Clock.scss'
import {constructClassString} from '../../utilities'

/**
 * @param {number} num
 * @return {string}
 */
function zeroPad(num) {
  return ('' + num).padStart(2, '0')
}

function Clock(props) {
  const minutes = Math.floor(props.timeMS / 60000)
  const seconds = Math.floor((props.timeMS % 60000) / 1000)
  const milliseconds = Math.floor((props.timeMS % 1000) / 10)
  // show MS if we're under 10 seconds left
  const showMilliseconds = props.timeMS < 10000

  return (
    <div className={constructClassString('clock', props.className)}>
      {!props.hideMinutes && (
        <React.Fragment>
          <span className="minutes">{zeroPad(minutes)}</span>
          <span className="colon">:</span>
        </React.Fragment>
      )}
      <span className="seconds">{zeroPad(seconds)}</span>
      {showMilliseconds && (
        <React.Fragment>
          <span className="period">.</span>
          <span className="milliseconds">{zeroPad(milliseconds)}</span>
        </React.Fragment>
      )}
    </div>
  )
}

Clock.propTypes = {
  timeMS: PropTypes.number.isRequired,
  hideMinutes: PropTypes.bool,
  className: PropTypes.string,
}

export default Clock
