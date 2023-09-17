import TeamScore from './TeamScore'
import './Scores.scss'
import React, {useContext} from 'react'
import GameContext from '../../../contexts/GameContext'

function Scores() {
  const {homeScore, changeHomeScore, visitorScore, changeVisitorScore} =
    useContext(GameContext)

  return (
    <div className="score-container">
      <TeamScore label={'Home'} score={homeScore} onChange={changeHomeScore} />
      <TeamScore
        label={'Visitor'}
        score={visitorScore}
        onChange={changeVisitorScore}
      />
    </div>
  )
}

export default Scores
