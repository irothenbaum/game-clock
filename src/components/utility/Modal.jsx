import React from 'react'
import './Modal.scss'
import Icon, {CLOSE} from './Icon'
import PropTypes from 'prop-types'
import {constructClassString} from '../../utilities'
import {Portal} from './Portal'

function Modal(props) {
  return (
    <Portal>
      <div
        className={constructClassString('modal-container', props.className, {
          open: props.isOpen,
        })}>
        <div className="modal-overlay" onClick={props.onClose} />
        <div className="modal-content">
          <Icon icon={CLOSE} className="close-icon" onClick={props.onClose} />
          {props.children}
        </div>
      </div>
    </Portal>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
}

export default Modal
