import moment from 'moment'
import { get, getWithAutoCast } from './get'
import { clearAll } from './clear'
import { momentConvertiblePatterns } from './testCommon'
import { isConvertibleToNumber } from './convertStringToAnyType'

describe('get()', () => {
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

    expect(get('foo')).toBe('bar')
  })

  test('get empty value', () => {
    document.cookie = 'foo='

    expect(get('foo')).toBe('')
  })

  test('get null on not existing', () => {
    document.cookie = 'bar=foo'

    expect(get('foo')).toBeNull()
  })

  test('get null on key is empty', () => {
    document.cookie = 'foo=bar'

    expect(get('')).toBeNull()
  })

  test('get equality sign in cookie value', () => {
    document.cookie = 'foo=bar=baz'

    expect(get('foo')).toBe('bar=baz')
  })

  test('percent character in cookie value', () => {
    document.cookie = 'foo=bar%'

    expect(get('foo')).toBe('bar%')
  })

  test('unencoded percent character in cookie value mixed with encoded values not permitted', () => {
    document.cookie = 'bad=foo%bar%22baz%qux'

    expect(get('bad')).toBeNull()
  })

  test('lowercase percent character in cookie value', () => {
    document.cookie = 'c=%d0%96'

    expect(get('c')).toBe('Ж')
  })

  test('RFC 6265 - reading cookie-octet enclosed in DQUOTE', () => {
    document.cookie = 'c="v"'

    expect(get('c')).toBe('v')
  })

  test('Call to read cookie when there is another cookie', () => {
    document.cookie = 'foo=bar'
    document.cookie = 'c=v'

    expect(get('c')).toBe('v')
  })

  test('Call to read cookie when there is another unrelated cookie with malformed encoding in the name', () => {
    document.cookie = '%A1=foo'
    document.cookie = 'c=v'

    expect(get('c')).toBe('v')
  })

  test('Call to read cookie when there is another unrelated cookie with malformed encoding in the value', () => {
    document.cookie = 'invalid=%A1'
    document.cookie = 'c=v'

    expect(get('c')).toBe('v')
  })

  test('value "[object Object]"', () => {
    document.cookie = 'value=[object Object]'

    expect(get('value')).toBe('[object Object]')
  })

  test('value "0"', () => {
    document.cookie = 'value=0'

    expect(get('value')).toBe('0')
  })

  test('value "null"', () => {
    document.cookie = 'value=null'

    expect(get('value')).toBe('null')
  })

  test('value "undefined"', () => {
    document.cookie = 'value=undefined'

    expect(get('value')).toBe('undefined')
  })
})

describe('getWithAutoCast()', () => {
  beforeEach(() => {
    clearAll()
  })

  afterEach(() => {
    clearAll()
  })

  test('getWithAutoCast return null on not existing', () => {
    document.cookie = 'bar=foo'

    expect(getWithAutoCast('foo')).toBeNull()
  })

  test('getWithAutoCast return null on key is empty', () => {
    document.cookie = 'foo=bar'

    expect(getWithAutoCast('')).toBeNull()
  })

  test('getWithAutoCast return null on value is "null"', () => {
    document.cookie = 'value=null'

    expect(getWithAutoCast('value')).toBeNull()
  })

  test('getWithAutoCast return undefined on value is "undefined"', () => {
    document.cookie = 'value=undefined'

    expect(getWithAutoCast('value')).toBeUndefined()
  })

  test('getWithAutoCast return number on value is "0"', () => {
    document.cookie = 'value=0'

    expect(getWithAutoCast('value')).toStrictEqual(0)
  })

  test('getWithAutoCast return number on value is "123.45"', () => {
    document.cookie = 'value=123.45'

    expect(getWithAutoCast('value')).toStrictEqual(123.45)
  })

  test('getWithAutoCast return number on value is "-123.45"', () => {
    document.cookie = 'value=-123.45'

    expect(getWithAutoCast('value')).toStrictEqual(-123.45)
  })

  test('getWithAutoCast return true on value is "true"', () => {
    document.cookie = 'value=true'

    expect(getWithAutoCast('value')).toBe(true)
  })

  test('getWithAutoCast return false on value is "false"', () => {
    document.cookie = 'value=false'

    expect(getWithAutoCast('value')).toBe(false)
  })

  momentConvertiblePatterns.forEach(pattern => {
    // priority to date over number
    if (isConvertibleToNumber(pattern)) return

    test(`getWithAutoCast return Date on value is "${pattern}"`, () => {
      document.cookie = `value=${pattern}`
      const resultDate = getWithAutoCast('value')

      expect(resultDate).toBeInstanceOf(Date)
      expect(resultDate).not.toBeNull()
      expect(resultDate).not.toBeUndefined()
      if (
        resultDate !== null &&
        resultDate !== undefined &&
        resultDate instanceof Date
      ) {
        expect(resultDate.toUTCString()).toBe(
          moment(pattern)
            .toDate()
            .toUTCString(),
        )
      }
    })
  })

  test('getWithAutoCast return array on value is "[ 123 , 45 , 147.56 , -147.56]"', () => {
    document.cookie = 'value=[ 123 , 45 , 147.56 , -147.56]'

    expect(getWithAutoCast<number, object>('value')).toStrictEqual([
      123,
      45,
      147.56,
      -147.56,
    ])
  })

  test('getWithAutoCast return array on value is "[{ "str" : "foo" } , { "str" : "bar" }]"', () => {
    document.cookie = 'value=[{ "str" : "foo" } , { "str" : "bar" }]'

    expect(getWithAutoCast<{ str: string }, object>('value')).toStrictEqual([
      { str: 'foo' },
      { str: 'bar' },
    ])
  })

  test('getWithAutoCast return {} on value is "{}"', () => {
    document.cookie = 'value={}'

    expect(getWithAutoCast<undefined, {}>('value')).toStrictEqual({})
  })

  test('getWithAutoCast return object on value is "{ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }"', () => {
    document.cookie =
      'value={ "str" : "foo", "num" : 45, "obj" : { "bool" : true } }'

    expect(
      getWithAutoCast<
        undefined,
        { str: string; num: number; obj: { bool: boolean } }
      >('value'),
    ).toStrictEqual({
      str: 'foo',
      num: 45,
      obj: { bool: true },
    })
  })

  test('getWithAutoCast string value', () => {
    document.cookie = 'foo=bar'

    expect(getWithAutoCast('foo')).toBe('bar')
  })

  test('getWithAutoCast empty string value', () => {
    document.cookie = 'foo='

    expect(getWithAutoCast('foo')).toBe('')
  })

  test('getWithAutoCast return string on value is "[object Object]"', () => {
    document.cookie = 'value=[object Object]'

    expect(getWithAutoCast('value')).toBe('[object Object]')
  })
})
