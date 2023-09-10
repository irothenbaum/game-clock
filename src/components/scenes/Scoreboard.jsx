import React, {useState} from 'react'
import './Scoreboard.scss'
import PropTypes from 'prop-types'
import TeamScore from '../scoreboard/TeamScore'
import useIncrement from '../../hooks/useIncrement'
import Clock from '../scoreboard/Clock'
function Scoreboard(props) {
  const {
    value: homeScore,
    setValue: setHomeScore,
    decrement: decHomeScore,
    increment: incHomeScore,
  } = useIncrement(0)

  const {
    value: visitorScore,
    setValue: setVisitorScore,
    decrement: decVisitorScore,
    increment: incVisitorScore,
  } = useIncrement(0)

  const {
    value: gameClock,
    setValue: setGameClock,
    decrement: decGameClock,
    increment: incGameClock,
  } = useIncrement(0)

  const {
    value: shotClock,
    setValue: setShotClock,
    decrement: decShotClock,
    increment: incShotClock,
  } = useIncrement(0)

  return (
    <div className="scoreboard">
      <div className="score-container">
        <TeamScore label={'Home'} score={homeScore} />
        <TeamScore label={'Visitor'} score={visitorScore} />
      </div>

      <Clock className="game-clock" timeMS={gameClock} />
      <Clock className="shot-clock" timeMS={shotClock} hideMinutes={true} />
    </div>
  )
}

Scoreboard.propTypes = {}

export default Scoreboard
