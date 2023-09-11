/**
 * @param {string|Object<string, boolean>} classes
 * @returns {string}
 */
export function constructClassString(...classes) {
  return classes
    .filter(o => !!o)
    .reduce((acc, curr) => {
      if (typeof curr === 'string') {
        acc.push(curr)
      } else if (typeof curr === 'object') {
        acc.push(
          ...Object.entries(curr || {})
            .filter(([key, value]) => !!value)
            .map(([key, value]) => key),
        )
      }

      return acc
    }, [])
    .join(' ')
}

/**
 * @param {number} timeMS
 * @returns {Array<number>}
 */
export function timeMSToParts(timeMS = 0) {
  const minutes = Math.floor(timeMS / 60000)
  const seconds = Math.floor((timeMS % 60000) / 1000)
  const milliseconds = Math.floor((timeMS % 1000) / 10)

  return [minutes, seconds, milliseconds]
}

/**
 * @param {number} minutes
 * @param {number?} seconds
 * @param {number?} milliseconds
 * @return {number}
 */
export function timePartsToMS(minutes, seconds = 0, milliseconds = 0) {
  return minutes * 60000 + seconds * 1000 + milliseconds * 10
}

/**
 * @param {QuickAction} a
 * @returns {boolean}
 */
export function filterCompletedQuickActions(a) {
  return (
    !!a.icon &&
    !!a.action &&
    typeof a.magnitude === 'number' &&
    a.magnitude >= 0
  )
}

const QUICK_ACTION_PREFIX = 'QuickAction-'

/**
 * @param {number} index
 * @return {string}
 */
export function quickActionToKeyBindingProp(index) {
  return `${QUICK_ACTION_PREFIX}${index}`
}

/**
 * @param {string} key
 * @return {number}
 */
export function keyBindingPropToQuickActionIndex(key) {
  return key.startsWith(QUICK_ACTION_PREFIX)
    ? parseInt(key.substring(QUICK_ACTION_PREFIX.length))
    : -1
}
