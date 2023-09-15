import React from 'react'
import './TeamScore.scss'
import PropTypes from 'prop-types'
import Icon, {CHEVRON_DOWN, CHEVRON_UP} from '../../utility/Icon'
import ToolTip, {ANCHOR_TOP, ANCHOR_BOTTOM} from '../../utility/ToolTip'

function TeamScore(props) {
  return (
    <div className="team-score">
      <h3 className="score-label">{props.label}</h3>
      <p className="score-value">{props.score}</p>

      {typeof props.onChange === 'function' ? (
        <div className="team-score-controls">
          <Icon
            className="score-change-button"
            icon={CHEVRON_UP}
            onClick={() => props.onChange(1)}
          />
          <div className="divider" />
          <Icon
            className="score-change-button"
            icon={CHEVRON_DOWN}
            onClick={() => props.onChange(-1)}
          />
        </div>
      ) : null}
    </div>
  )
}

TeamScore.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  onChange: PropTypes.func,
}

export default TeamScore
