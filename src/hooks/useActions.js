import {useContext} from 'react'
import GameContext from '../GameContext'
import {
  ACTION_START_SHOT_CLOCK,
  ACTION_STOP_SHOT_CLOCK,
  ACTION_DECREASE_HOME_SCORE,
  ACTION_DECREASE_VISITOR_SCORE,
  ACTION_INCREASE_HOME_SCORE,
  ACTION_INCREASE_VISITOR_SCORE,
  ACTION_START_GAME_CLOCK,
  ACTION_STOP_GAME_CLOCK,
  ACTION_SET_GAME_CLOCK,
  ACTION_SET_SHOT_CLOCK,
} from '../constants/actions'

/**
 * @return {{execute: function(string|QuickAction, number?): void}}
 */
function useActions() {
  const {
    stopGameClock,
    startGameClock,
    stopShotClock,
    startShotClock,
    changeHomeScore,
    changeVisitorScore,
    setGameClock,
    setShotClock,
  } = useContext(GameContext)

  /**
   * @param {string} action
   * @param {number?} magnitude
   */
  const execute = (action, magnitude) => {
    switch (action) {
      case ACTION_START_SHOT_CLOCK:
        startShotClock()
        break

      case ACTION_STOP_SHOT_CLOCK:
        stopShotClock()
        break

      case ACTION_START_GAME_CLOCK:
        // whenever the game clock starts or stop, so too does the shot clock
        startGameClock()
        startShotClock()
        break

      case ACTION_STOP_GAME_CLOCK:
        // whenever the game clock starts or stop, so too does the shot clock
        stopGameClock()
        stopShotClock()
        break

      case ACTION_DECREASE_HOME_SCORE:
        changeHomeScore(-1)
        break

      case ACTION_DECREASE_VISITOR_SCORE:
        changeVisitorScore(-1)
        break

      case ACTION_INCREASE_HOME_SCORE:
        changeHomeScore(1)
        break

      case ACTION_INCREASE_VISITOR_SCORE:
        changeVisitorScore(1)
        break

      case ACTION_SET_GAME_CLOCK:
        setGameClock(magnitude)
        break

      case ACTION_SET_SHOT_CLOCK:
        setShotClock(magnitude)
        break

      default:
        window.alert(`Unknown action "${action}"`)
    }
  }

  return {
    execute: execute,
  }
}

export default useActions
