import {useEffect, useRef, useState} from 'react'
import useDoOnceTimer from './useDoOnceTimer'

const TIMER_KEY = 'timer'

/**
 * @param {number} startingValue
 * @param {number?} updateInterval
 * @return {{startClock: startClock, isRunning: boolean, stopClock: stopClock, timeRemaining: number, setClock: setClock}}
 */
function useClock(startingValue, updateInterval = 50) {
  const endTimeRef = useRef(null)
  const [isRunning, setIsRunning] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(startingValue)
  const {setTimer, cancelTimer} = useDoOnceTimer()

  const refreshTimeRemaining = () => {
    setTimeRemaining(
      Math.max(0, (endTimeRef.current || Date.now()) - Date.now()),
    )
  }

  useEffect(() => {
    if (isRunning) {
      const tick = () => {
        refreshTimeRemaining()
        setTimer(TIMER_KEY, tick, updateInterval)
      }

      tick()
    } else {
      cancelTimer(TIMER_KEY, null)
    }
  }, [isRunning])

  const startClock = () => {
    if (isRunning) {
      return
    }

    endTimeRef.current = Date.now() + timeRemaining
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
    endTimeRef.current = Date.now() + timeMS
    refreshTimeRemaining()
  }

  return {
    isRunning,
    timeRemaining,
    startClock,
    stopClock,
    setClock,
  }
}

export default useClock
