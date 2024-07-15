import { getKeyValuePairsFromCookie } from './getKeyValuePairsFromCookie'
import set, { CookieAttributes } from './set'

export const clear = (
  key: string,
  option?: Pick<CookieAttributes, 'path'>,
): void => {
  const dt = new Date('1999-12-31T23:59:59Z') // past dateTime

  const path =
    option !== undefined && option.path !== undefined ? option.path : undefined

  set(key, '', { expires: dt, path })
}

/**
 * cannot clear HttpOnly flag set cookies and path set cookies
 */
export const clearAll = (): void => {
  const keyValuePairs = getKeyValuePairsFromCookie(true)
  const dt = new Date('1999-12-31T23:59:59Z') // past dateTime

  keyValuePairs.forEach(({ key }) => {
    set(key, '', { expires: dt })
  })
}
