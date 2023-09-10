import {createContext} from 'react'
const GAME_CACHE_KEY = 'game-clock-game'

export const DefaultGame = {
  homeScore: 0,
  visitorScore: 0,
  shotClockMS: 0,
  gameClockMS: 0,
}

// hydrate from our stored value
const storedValue = localStorage[GAME_CACHE_KEY]
export const HydratedSettings = storedValue
  ? JSON.parse(storedValue)
  : DefaultGame

/**
 * A function to write to storage. This is called whenever a settings change is made
 * @param {*} obj
 */
export const flushGame = obj => {
  localStorage[GAME_CACHE_KEY] = JSON.stringify(obj)
}

const GameContext = createContext(DefaultGame)

export default GameContext
