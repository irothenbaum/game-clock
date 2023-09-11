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
} from '../constants/keystrokes'

/**
 * @return {{execute: function(string): void}}
 */
function useActions() {
  const {
    stopGameClock,
    startGameClock,
    stopShotClock,
    startShotClock,
    changeHomeScore,
    changeVisitorScore,
  } = useContext(GameContext)

  /**
   * @param {string} action
   */
  const execute = action => {
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

      default:
        window.alert(`Unknown action "${action}"`)
    }
  }

  return {
    execute: execute,
  }
}

export default useActions
