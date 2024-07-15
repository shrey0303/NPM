import {
  decode,
  getKeyValuePairsFromCookie,
} from './getKeyValuePairsFromCookie'
import { clearAll } from './clear'

describe('decode()', () => {
  test('decode on value in include percent', () => {
    const value = 'foobarbaz%d0%96'

    expect(decode(value)).toBe('foobarbazЖ')
  })

  test('not decode on value in not include percent', () => {
    const value = 'foobarbaz'

    expect(decode(value)).toBe(value)
  })

  test('throw URIError on unencoded percent character in value mixed with encoded values not permitted', () => {
    const value = 'foo%bar%22baz%qux'

    expect(() => decode(value)).toThrowError(URIError)
  })
})

describe('getKeyValuePairsFromCookie()', () => {
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()

    //  can not clearAll() is clear a unrelated cookie with malformed encoding in the name
    const dt = new Date('1999-12-31T23:59:59Z')
    document.cookie = `%A1=; expires=${dt.toUTCString()}`
  })

  test('get simple value', () => {
    document.cookie = 'foo=bar'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: 'bar' },
    ])
  })

  test('get empty value', () => {
    document.cookie = 'foo='

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: '' },
    ])
  })

  test('get empty array', () => {
    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([])
  })

  test('get equality sign in cookie value', () => {
    document.cookie = 'foo=bar=baz'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: 'bar=baz' },
    ])
  })

  test('Call to read cookie when multiple cookies', () => {
    document.cookie = 'foo=bar'
    document.cookie = 'c=v'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: 'bar' },
      { key: 'c', value: 'v' },
    ])
  })

  test('percent character in cookie value', () => {
    document.cookie = 'foo=bar%'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'foo', value: 'bar%' },
    ])
  })

  test('unencoded percent character in cookie value mixed with encoded values not permitted', () => {
    document.cookie = 'bad=foo%bar%22baz%qux'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([])
  })

  test('ignoreError. unencoded percent character in cookie value mixed with encoded values not permitted', () => {
    document.cookie = 'bad=foo%bar%22baz%qux'

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([
      { key: 'bad', value: '' },
    ])
  })

  test('lowercase percent character in cookie value', () => {
    document.cookie = 'c=%d0%96'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'c', value: 'Ж' },
    ])
  })

  test('Call to read cookie when there is another unrelated cookie with malformed encoding in the name', () => {
    document.cookie = '%A1=foo'
    document.cookie = 'c=v'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'c', value: 'v' },
    ])
  })

  test('ignoreError. Call to read cookie when there is another unrelated cookie with malformed encoding in the name', () => {
    document.cookie = '%A1=foo'
    document.cookie = 'c=v'

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([
      { key: '', value: '' },
      { key: 'c', value: 'v' },
    ])
  })

  test('Call to read cookie when there is another unrelated cookie with malformed encoding in the value', () => {
    document.cookie = 'invalid=%A1'
    document.cookie = 'c=v'

    expect(getKeyValuePairsFromCookie(false)).toStrictEqual([
      { key: 'c', value: 'v' },
    ])
  })

  test('ignoreError. Call to read cookie when there is another unrelated cookie with malformed encoding in the value', () => {
    document.cookie = 'invalid=%A1'
    document.cookie = 'c=v'

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([
      { key: 'invalid', value: '' },
      { key: 'c', value: 'v' },
    ])
  })
})
