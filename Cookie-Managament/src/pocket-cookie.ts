import { get, getWithAutoCast } from './get'
import set from './set'
import { clear, clearAll } from './clear'
import { getKeyValuePairsFromCookie } from './getKeyValuePairsFromCookie'

const api = {
  get,
  set,
  getWithAutoCast,
  clear,
  clearAll,
  getKeyValuePairs: () => getKeyValuePairsFromCookie(false),
}

export default api
