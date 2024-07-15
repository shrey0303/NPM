import { clearAll } from './clear'
import set from './set'
import { get } from './get'

describe('set()', () => {
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('set empty value', () => {
    set('foo', '')
    expect(get('foo')).toBe('')
  })

  test('set simple value', () => {
    set('foo', 'bar')
    expect(get('foo')).toBe('bar')
  })

  test('return simple value', () => {
    expect(set('foo', 'bar')).toBe('foo=bar')
  })
})

/**
 * TODO more many tests...
 * https://github.com/js-cookie/js-cookie/blob/v3.0.0-beta.0/test/encoding.js
 */
describe('set() encoding', () => {
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('RFC 6265 - character not allowed in the cookie-value " "', () => {
    set('c', ' ')
    expect(document.cookie).toBe('c=%20')
  })

  test('RFC 6265 - character not allowed in the cookie-value ","', () => {
    set('c', ',')
    expect(document.cookie).toBe('c=%2C')
  })

  test('RFC 6265 - character not allowed in the cookie-value ";"', () => {
    set('c', ';')
    expect(document.cookie).toBe('c=%3B')
  })

  test('RFC 6265 - character not allowed in the cookie-value "\\"', () => {
    set('c', '\\')
    expect(document.cookie).toBe('c=%5C')
  })

  test('RFC 6265 - characters not allowed in the cookie-value should be replaced globally', () => {
    set('c', ';;')
    expect(document.cookie).toBe('c=%3B%3B')
  })
})

describe('set() with cookieAttributes', () => {
  // jsDom is can clear Path set cookie
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('cookieAttributes is {}', () => {
    expect(set('foo', 'bar', {})).toBe('foo=bar')
  })

  test('cookieAttributes is { expires: 200 }', () => {
    const days = 200
    const date = new Date(new Date().valueOf() + days * 24 * 60 * 60 * 1000)
    const expected = `expires=${date.toUTCString()}; `
    expect(set('foo', 'bar', { expires: days })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { expires: Date }', () => {
    const days = 200
    const date = new Date(new Date().valueOf() + days * 24 * 60 * 60 * 1000)
    const expected = `expires=${date.toUTCString()}; `
    expect(set('foo', 'bar', { expires: date })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { path: "/index.html" }', () => {
    const path = '/index.html'
    const expected = `path=${path}; `
    expect(set('foo', 'bar', { path })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { domain: "example.com" }', () => {
    const domain = 'example.com'
    const expected = `domain=${domain}; `
    expect(set('foo', 'bar', { domain })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { secure: true }', () => {
    const expected = 'secure; '
    expect(set('foo', 'bar', { secure: true })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { secure: false }', () => {
    expect(set('foo', 'bar', { secure: false })).toBe('foo=bar')
  })

  test('cookieAttributes is { maxAge: 200 }', () => {
    const days = 200
    const maxAge = days * 24 * 60 * 60
    const expected = `max-age=${maxAge}; `
    expect(set('foo', 'bar', { maxAge: days })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { samesite: "strict" }', () => {
    const samesite = 'strict'
    const expected = `samesite=${samesite}; `
    expect(set('foo', 'bar', { samesite })).toBe(`foo=bar; ${expected}`)
  })

  test('cookieAttributes is { samesite: "lax" }', () => {
    const samesite = 'lax'
    const expected = `samesite=${samesite}; `
    expect(set('foo', 'bar', { samesite })).toBe(`foo=bar; ${expected}`)
  })

  test('all cookieAttributes', () => {
    const expiresDays = 200
    const path = '/index.html'
    const domain = 'example.com'
    const maxAgeDays = 300
    const samesite = 'strict'

    const expiresDate = new Date(
      new Date().valueOf() + expiresDays * 24 * 60 * 60 * 1000,
    )
    const maxAge = maxAgeDays * 24 * 60 * 60

    const expected = `expires=${expiresDate.toUTCString()}; path=${path}; domain=${domain}; secure; max-age=${maxAge}; samesite=${samesite}; `
    expect(
      set('foo', 'bar', {
        expires: expiresDays,
        path,
        domain,
        secure: true,
        maxAge: maxAgeDays,
        samesite,
      }),
    ).toBe(`foo=bar; ${expected}`)
  })
})

describe('set() set cookie of stringify value', () => {
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('set string value', () => {
    set('v', 'str')
    expect(get('v')).toBe('str')
  })

  test('set number value', () => {
    set('v', 123.45)
    expect(get('v')).toBe('123.45')
  })

  test('set boolean value', () => {
    set('t', true)
    expect(get('t')).toBe('true')
    set('f', false)
    expect(get('f')).toBe('false')
  })

  test('set Date value', () => {
    const date = new Date()
    set('v', date)
    expect(get('v')).toBe(date.toUTCString())
  })

  test('set array value', () => {
    const arr = [123.45, -45878, 1245, 0.3654]
    set('v', arr)
    expect(get('v')).toBe('[123.45,-45878,1245,0.3654]')
  })

  test('set object value', () => {
    set('obj1', {})
    expect(get('obj1')).toBe('{}')
    set('obj2', { foo: 'bar', baz: 987 })
    expect(get('obj2')).toBe('{"foo":"bar","baz":987}')
  })

  test('set null value', () => {
    set('v', null)
    expect(get('v')).toBe('null')
  })

  test('set null undefined', () => {
    set('v', undefined)
    expect(get('v')).toBe('undefined')
  })
})
