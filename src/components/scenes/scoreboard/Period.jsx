import React, {useContext} from 'react'
import './Period.scss'
import TeamScore from './TeamScore'
import GameContext from '../../../GameContext'

function Period(props) {
  const {period, changePeriod} = useContext(GameContext)

  return (
    <div className="period-container">
      <TeamScore label={'Period'} score={period} onChange={changePeriod} />
    </div>
  )
}

export default Period
