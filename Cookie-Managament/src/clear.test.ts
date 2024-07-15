import { clearAll, clear } from './clear'
import { getKeyValuePairsFromCookie } from './getKeyValuePairsFromCookie'
import set from './set'

describe('clearAll()', () => {
  afterEach(() => {
    clearAll()

    //  can not clearAll() is clear a unrelated cookie with malformed encoding in the name
    const dt = new Date('1999-12-31T23:59:59Z')
    document.cookie = `%A1=; expires=${dt.toUTCString()}`
  })

  test('clear simple cookie', () => {
    set('foo', 'bar')
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('clear multiple cookies', () => {
    set('foo', 'bar')
    set('c', 'v')
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('clear cookie of unencoded percent character in cookie value mixed with encoded values not permitted', () => {
    set('bad', 'foo%bar%22baz%qux')
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('can clear cookie of malformed encoding in the name', () => {
    set('%A1', 'invalid')
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('can clear cookie of malformed encoding in the value', () => {
    set('invalid', '%A1')
    clearAll()

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  // jsDom is can clear Path set cookie
  // test('cannot clear Path set cookie', () => {
  //   document.cookie = 'foo=bar; path=/'
  //   clearAll()
  //
  //   expect(getKeyValuePairsFromCookie()).toStrictEqual([
  //     { key: 'foo', value: 'bar' },
  //   ])
  // })
})

describe('clear()', () => {
  // afterEach(() => {
  //   clearAll()
  // })

  test('clear simple cookie', () => {
    set('foo', 'bar')
    clear('foo')

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('clear cookie of unencoded percent character in cookie value mixed with encoded values not permitted', () => {
    set('bad', 'foo%bar%22baz%qux')
    clear('bad')

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('clear cookie of malformed encoding in the name', () => {
    set('%A1', 'invalid')
    clear('%A1')

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  test('can clear cookie of malformed encoding in the value', () => {
    set('invalid', '%A1')
    clear('invalid')

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })

  // jsDom is can clear Path set cookie
  // test('cannot clear Path set cookie with no option', () => {
  //   set('foo', 'bar', { path: '/index.html' })
  //   clear('foo')
  //
  //   expect(getKeyValuePairsFromCookie(true)).toStrictEqual([
  //     { key: 'foo', value: 'bar' },
  //   ])
  // })

  test('can clear Path set cookie with path option', () => {
    set('baz', 'qux', { path: '/index.html' })
    clear('baz', { path: '/index.html' })

    expect(getKeyValuePairsFromCookie(true)).toStrictEqual([])
  })
})
