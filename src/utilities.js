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
