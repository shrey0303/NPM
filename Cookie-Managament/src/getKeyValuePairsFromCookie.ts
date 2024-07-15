export const decode = (s: string): string => {
  return s.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
}

type keyValuePair = {
  key: string
  value: string
}

interface KeyValuePairWithSuccess extends keyValuePair {
  success: boolean
}

export const getKeyValuePairsFromCookie = (
  ignoreError: boolean,
): keyValuePair[] => {
  if (typeof document === 'undefined' || !document.cookie) return []

  const cookies = document.cookie.split('; ')
  if (cookies.length === 1 && cookies[0] === '') return []

  return cookies
    .map<KeyValuePairWithSuccess>(cookie => {
      const parts = cookie.split('=')

      let key = ''
      let value = ''
      let success = ignoreError
      try {
        key = decode(parts[0])
        value = decode(parts.slice(1).join('='))
        value = value.charAt(0) === '"' ? value.slice(1, -1) : value
        success = true
      } catch (e) {
        if (!ignoreError)
          console.warn(`Occur Error On Cookie decodeURIComponent`)
      }

      return { key, value, success }
    })
    .filter(pair => pair.success)
    .map<keyValuePair>(pair => {
      return { key: pair.key, value: pair.value }
    })
}
