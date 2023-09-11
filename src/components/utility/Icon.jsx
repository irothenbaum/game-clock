import React from 'react'
import './Icon.scss'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faCheck,
  faTimes,
  faChevronUp,
  faChevronDown,
  faPlay,
  faPause,
  faClockRotateLeft,
  faPencil,
  faGear,
  faStopwatch,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import {faCircle} from '@fortawesome/free-regular-svg-icons'
import {constructClassString} from '../../utilities'

export const CHEVRON_LEFT = faChevronLeft
export const CHEVRON_RIGHT = faChevronRight
export const CHEVRON_UP = faChevronUp
export const CHEVRON_DOWN = faChevronDown
export const SPINNER = faSpinner
export const CHECK = faCheck
export const CLOSE = faTimes
export const PLAY = faPlay
export const STOP = faPause
export const RESET = faClockRotateLeft
export const EDIT = faPencil
export const SETTINGS = faGear
export const STOPWATCH = faStopwatch
export const PLUS = faPlus

function Icon(props) {
  return (
    <span
      style={props.style}
      className={constructClassString(
        {
          'has-click-handler': typeof props.onClick === 'function',
          spin: props.icon === SPINNER,
        },
        props.className,
        'icon-container',
      )}
      onClick={props.onClick}>
      <FontAwesomeIcon icon={props.icon} />
    </span>
  )
}

Icon.propTypes = {
  icon: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default Icon
