import React, {useContext, forwardRef, useEffect} from 'react'
import './Scoreboard.scss'
import Scores from './scoreboard/Scores'
import GameAndShotClocks from './scoreboard/GameAndShotClocks'

const Scoreboard = forwardRef(function Scoreboard(props, ref) {
  // // TODO: Trying to implement some local caching in case screen gets refreshed
  // useEffect(() => {
  //   flushGame({
  //     homeScore,
  //     visitorScore,
  //     shotClockRemaining,
  //     gameClockRemaining,
  //   })
  // }, [gameClockRemaining, homeScore, visitorScore, shotClockRemaining])

  return (
    <div className="scoreboard" ref={ref}>
      <Scores />
      <GameAndShotClocks />
    </div>
  )
})

Scoreboard.propTypes = {}

export default Scoreboard
