import {createContext} from 'react'
const SETTINGS_CACHE_KEY = 'game-clock-settings'

export const DefaultSettings = {
  periodLengthMS: 0,
  shotClockMS: 0,
  keyBindings: {},
  quickActions: {},
  isSettingsPanelOpen: false, // this one doesn't really fit, but it's a good place to put it
  areSoundsMuted: false,
}

// hydrate from our stored value
const storedValue = localStorage[SETTINGS_CACHE_KEY]

const storedObject =
  typeof storedValue === 'string' && !!storedValue
    ? JSON.parse(storedValue)
    : null

export const HydratedSettings = storedObject
  ? {...DefaultSettings, ...storedObject}
  : DefaultSettings

/**
 * A function to write to storage. This is called whenever a settings change is made
 * @param {*} obj
 */
export function flushSettings(obj) {
  localStorage[SETTINGS_CACHE_KEY] = JSON.stringify(obj)
}

const SettingsContext = createContext(DefaultSettings)

export default SettingsContext
