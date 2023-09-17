import {contextFactor} from './shared'
const SESSION_CACHE_KEY = 'game-clock-session'

/**
 * @typedef PresetGameSetting
 * @property {string?} id
 * @param {string} name
 * @param {icon} icon
 * @param {SettingsContextData} settings
 */

/**
 * @typedef {Object} SessionContextData
 * @property {boolean} isSettingsPanelOpen
 * @property {Object<string, PresetGameSetting>} presetGameSettings
 */
export const DefaultSession = {
  isSettingsPanelOpen: false,
  presetGameSettings: {},
}

const [SessionContext, HydratedSession, flushSession] = contextFactor(
  DefaultSession,
  SESSION_CACHE_KEY,
)

export {HydratedSession, flushSession}

export default SessionContext
