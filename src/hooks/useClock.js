import {useEffect, useRef, useState} from 'react'

/**
 * @param {number} startingValue
 * @param {number?} updateInterval
 * @return {{startClock: startClock, isRunning: boolean, stopClock: stopClock, timeRemaining: number, setClock: setClock}}
 */
function useClock(startingValue, updateInterval = 50) {
  const endTimeRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(startingValue)

  const refreshTimeRemaining = () => {
    const newTimeRemaining = Math.max(
      0,
      (endTimeRef.current || Date.now()) - Date.now(),
    )
    setTimeRemaining(newTimeRemaining)
  }

  const startClock = () => {
    if (isRunning) {
      return
    }

    endTimeRef.current = Date.now() + timeRemaining
    refreshTimeRemaining()
    setIsRunning(true)
  }

  const stopClock = () => {
    if (!isRunning) {
      return
    }

    refreshTimeRemaining()
    setIsRunning(false)
    endTimeRef.current = null
  }

  /**
   * @param {number} timeMS
   */
  const setClock = timeMS => {
    // this is a littttttle hacky, but we're adding a very small random number to the end time
    // to ensure that the timeRemaining is updated to a new value. This is to resolve an issue
    // where the clock is reset after only having been started from the same reset value.
    // i.e. if the shot clock is started at :30, and then after 10 seconds reset back to :30
    // the actual timeRemaining would appear unchanged (30000 before, 30000) after
    // and the Clock component listening for changes to timeMS would not update
    // By incorporating some small variance we ensure the reset event propagates
    endTimeRef.current = Date.now() + timeMS + Math.random()
    refreshTimeRemaining()
  }

  return {
    // while the clock is running, the timeRemaining is not updated for performance reasons
    // when the clock is stopped, started, or reset, then the timeRemaining is updated
    // components that care about realtime timeRemaining will need to calculate it on their own using use effects
    isRunning,
    timeRemaining,
    startClock,
    stopClock,
    setClock,
  }
}

export default useClock
