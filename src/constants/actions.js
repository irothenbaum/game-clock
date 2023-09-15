export const ACTION_START_GAME_CLOCK = 'ACTION_START_GAME_CLOCK'
export const ACTION_STOP_GAME_CLOCK = 'ACTION_STOP_GAME_CLOCK'

export const ACTION_START_SHOT_CLOCK = 'ACTION_START_SHOT_CLOCK'
export const ACTION_STOP_SHOT_CLOCK = 'ACTION_STOP_SHOT_CLOCK'

export const ACTION_INCREASE_HOME_SCORE = 'ACTION_INCREASE_HOME_SCORE'
export const ACTION_DECREASE_HOME_SCORE = 'ACTION_DECREASE_HOME_SCORE'

export const ACTION_INCREASE_VISITOR_SCORE = 'ACTION_INCREASE_VISITOR_SCORE'
export const ACTION_DECREASE_VISITOR_SCORE = 'ACTION_DECREASE_VISITOR_SCORE'
export const ACTION_RESET_SHOT_CLOCK = 'ACTION_RESET_SHOT_CLOCK'
export const ACTION_SET_GAME_CLOCK = 'ACTION_SET_GAME_CLOCK'
export const ACTION_SET_SHOT_CLOCK = 'ACTION_SET_SHOT_CLOCK'

export const actionLabels = {
  [ACTION_START_GAME_CLOCK]: 'Start Game Clock',
  [ACTION_STOP_GAME_CLOCK]: 'Stop Game Clock',
  [ACTION_START_SHOT_CLOCK]: 'Start Shot Clock',
  [ACTION_STOP_SHOT_CLOCK]: 'Stop Shot Clock',
  [ACTION_RESET_SHOT_CLOCK]: 'Reset Shot Clock',
  [ACTION_INCREASE_HOME_SCORE]: 'Increase Home Score',
  [ACTION_DECREASE_HOME_SCORE]: 'Decrease Home Score',
  [ACTION_INCREASE_VISITOR_SCORE]: 'Increase Visitor Score',
  [ACTION_DECREASE_VISITOR_SCORE]: 'Decrease Visitor Score',
  [ACTION_SET_GAME_CLOCK]: 'Set Game Clock',
  [ACTION_SET_SHOT_CLOCK]: 'Set Shot Clock',
}

export const singleClickActions = [
  ACTION_START_GAME_CLOCK,
  ACTION_STOP_GAME_CLOCK,
  ACTION_START_SHOT_CLOCK,
  ACTION_STOP_SHOT_CLOCK,
  ACTION_RESET_SHOT_CLOCK,
  ACTION_INCREASE_HOME_SCORE,
  ACTION_DECREASE_HOME_SCORE,
  ACTION_INCREASE_VISITOR_SCORE,
  ACTION_DECREASE_VISITOR_SCORE,
]

export const customizableActions = [
  ACTION_SET_GAME_CLOCK,
  ACTION_SET_SHOT_CLOCK,
]
