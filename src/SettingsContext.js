import {createContext} from 'react'
const SETTINGS_CACHE_KEY = 'game-clock-settings'

export const DefaultSettings = {
  periodLengthMS: 420000, // 7 minutes
  shotClockMS: 30000, // 30 seconds
}

// hydrate from our stored value
const storedValue = localStorage[SETTINGS_CACHE_KEY]
export const HydratedSettings = storedValue
  ? JSON.parse(storedValue)
  : DefaultSettings

/**
 * A function to write to storage. This is called whenever a settings change is made
 * @param {*} obj
 */
export const flushSettings = obj => {
  localStorage[SETTINGS_CACHE_KEY] = JSON.stringify(obj)
}

const SettingsContext = createContext(DefaultSettings)

export default SettingsContext
