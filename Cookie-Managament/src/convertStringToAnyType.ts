import moment from 'moment'
import { is } from './utility'

export const isConvertibleToNumber = (s: string): boolean => {
  if (!s) return false
  const toNumber = Number(s)

  return !Number.isNaN(toNumber)
}

export const isConvertibleToBool = (s: string): boolean => {
  if (!s) return false

  return s === 'true' || s === 'false'
}

export const isConvertibleToDate = (s: string): boolean => {
  if (!s) return false

  return moment(s).isValid()
}

export const isConvertibleToArray = (s: string): boolean => {
  if (!s) return false

  let toArray: any
  try {
    toArray = JSON.parse(s)
  } catch (e) {
    return false
  }

  return is.arr(toArray)
}

export const isConvertibleToObject = (s: string): boolean => {
  if (!s) return false

  let toObject: any
  try {
    toObject = JSON.parse(s)
  } catch (e) {
    return false
  }

  return is.obj(toObject)
}

export const isConvertibleToNull = (s: string): boolean => {
  if (!s) return false

  return s === 'null'
}

export const isConvertibleToUndefined = (s: string): boolean => {
  if (!s) return false

  return s === 'undefined'
}

export const convertToBool = (s: string): boolean => {
  return s === 'true'
}

export const convertToDate = (s: string): Date => {
  return moment(s).toDate()
}

export const convertToArray = <T>(s: string): Array<T> => {
  return JSON.parse(s) as Array<T>
}

export const convertToObject = <T extends {}>(s: string): T => {
  return JSON.parse(s) as T
}
