import {contextFactor} from './shared'
const GAME_CACHE_KEY = 'game-clock-game'

/**
 * @typedef {Object} GameContextData
 * @property {number} period
 * @property {number} homeScore
 * @property {number} visitorScore
 * @property {number} shotClockRemaining
 * @property {number} gameClockRemaining
 */
export const DefaultGame = {
  period: 1,
  homeScore: 0,
  visitorScore: 0,
  shotClockRemaining: 0,
  gameClockRemaining: 0,
}

const [GameContext, HydratedGame, flushGame] = contextFactor(
  DefaultGame,
  GAME_CACHE_KEY,
)

export {HydratedGame, flushGame}

export default GameContext
