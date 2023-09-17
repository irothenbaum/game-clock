import {contextFactor} from './shared'
const SETTINGS_CACHE_KEY = 'game-clock-settings'

/**
 * @typedef QuickAction
 * @property {string} id
 * @property {string} action
 * @property {*} icon
 * @property {string} label
 * @property {number} magnitude
 */

/**
 * @typedef {Object} SettingsContextData
 * @property {number} periodLengthMS
 * @property {number} shotClockMS
 * @property {Object<string, string>} keyBindings
 * @property {Object<string, QuickAction>} quickActions
 */
export const DefaultSettings = {
  periodLengthMS: 0,
  shotClockMS: 0,
  keyBindings: {},
  quickActions: {},
  areSoundsMuted: false,
}

const [SettingsContext, HydratedSettings, flushSettings] = contextFactor(
  DefaultSettings,
  SETTINGS_CACHE_KEY,
)
export {HydratedSettings, flushSettings}

export default SettingsContext
