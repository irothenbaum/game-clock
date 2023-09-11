import {createContext} from 'react'
import {keyBindingPropToQuickActionIndex} from './utilities'
const SETTINGS_CACHE_KEY = 'game-clock-settings'

export const DefaultSettings = {
  periodLengthMS: 420000, // 7 minutes
  shotClockMS: 30000, // 30 seconds
  keyBindings: {},
  quickActions: [],

  isSettingsPanelOpen: false, // this one doesn't really fit, but it's a good place to put it
}

// hydrate from our stored value
const storedValue = localStorage[SETTINGS_CACHE_KEY]

const storedObject = storedValue ? JSON.parse(storedValue) : null

if (storedObject) {
  // here we remove any dead links between quickActions and keybindings
  Object.keys(storedObject.keyBindings).forEach(key => {
    const index = keyBindingPropToQuickActionIndex(key)
    // if the keybinding index of this quick action is greater than the length of the quick actions array, then it has been removed
    if (index >= storedObject.quickActions.length) {
      delete storedObject.keyBindings[key]
    }
  })

  flushSettings(storedObject)
}

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
