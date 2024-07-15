import {
  convertToArray,
  convertToBool,
  convertToDate,
  convertToObject,
  isConvertibleToArray,
  isConvertibleToBool,
  isConvertibleToDate,
  isConvertibleToNull,
  isConvertibleToNumber,
  isConvertibleToObject,
  isConvertibleToUndefined,
} from './convertStringToAnyType'
import { autoCast } from './commonTypes'
import { getKeyValuePairsFromCookie } from './getKeyValuePairsFromCookie'

export const get = (key: string): string | null => {
  if (typeof document === 'undefined' || !key || !document.cookie) {
    return null
  }

  const keyValuePairs = getKeyValuePairsFromCookie(false)
  const find = keyValuePairs.find(keyValuePair => {
    return keyValuePair.key === key
  })

  return find ? find.value : null
}

/**
 * priority to date over number
 */
export const getWithAutoCast = <T1, T2 extends {}>(
  key: string,
): autoCast<T1, T2> => {
  const value = get(key)
  if (value === null) return null

  if (isConvertibleToNull(value)) return null
  if (isConvertibleToUndefined(value)) return undefined
  if (isConvertibleToNumber(value)) return Number(value)
  if (isConvertibleToBool(value)) return convertToBool(value)
  if (isConvertibleToDate(value)) return convertToDate(value)
  if (isConvertibleToArray(value)) return convertToArray<T1>(value)
  if (isConvertibleToObject(value)) return convertToObject<T2>(value)

  return value
}
