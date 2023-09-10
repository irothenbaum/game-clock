import React from 'react'
import './TeamScore.scss'
import PropTypes from 'prop-types'

function TeamScore(props) {
  return (
    <div className="team-score">
      <h3>{props.label}</h3>
      <p>{props.score}</p>
    </div>
  )
}

TeamScore.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
}

export default TeamScore
