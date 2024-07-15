import moment from 'moment'
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
import { momentConvertiblePatterns } from './testCommon'

describe('isConvertibleToNumber()', () => {
  test('isConvertibleToNumber return true on pass number string', () => {
    expect(isConvertibleToNumber('45.1987')).toBe(true)
  })

  test('isConvertibleToNumber return true on pass "0"', () => {
    expect(isConvertibleToNumber('0')).toBe(true)
  })

  test('isConvertibleToNumber return true on pass minus number string', () => {
    expect(isConvertibleToNumber('-45.789')).toBe(true)
  })

  test('isConvertibleToNumber return false on not number string', () => {
    expect(isConvertibleToNumber('foo')).toBe(false)
  })

  test('isConvertibleToNumber return false on pass empty string', () => {
    expect(isConvertibleToNumber('')).toBe(false)
  })
})

describe('isConvertibleToBool()', () => {
  test('isConvertibleToBool return true on pass "true"', () => {
    expect(isConvertibleToBool('true')).toBe(true)
  })

  test('isConvertibleToBool return true on pass "false"', () => {
    expect(isConvertibleToBool('false')).toBe(true)
  })

  test('isConvertibleToBool return false on pass not bool string', () => {
    expect(isConvertibleToBool('foo')).toBe(false)
  })

  test('isConvertibleToBool return false on pass empty string', () => {
    expect(isConvertibleToBool('')).toBe(false)
  })
})

describe('isConvertibleToDate()', () => {
  momentConvertiblePatterns.forEach(pattern => {
    test(`isConvertibleToDate return true on pass "${pattern}"`, () => {
      expect(isConvertibleToDate(pattern)).toBe(true)
    })
  })

  test('isConvertibleToDate return false on pass not datetime string', () => {
    expect(isConvertibleToDate('foo')).toBe(false)
  })

  test('isConvertibleToDate return false on pass empty string', () => {
    expect(isConvertibleToDate('')).toBe(false)
  })
})

describe('isConvertibleToArray()', () => {
  test('isConvertibleToArray return true on pass "[ 123 , "foo" , true , null]"', () => {
    expect(isConvertibleToArray('[ 123 , "foo" , true , null]')).toBe(true)
  })

  test('isConvertibleToArray return true on pass "[{ "str" : "foo" } , { "str" : "bar" }]"', () => {
    expect(
      isConvertibleToArray('[{ "str" : "foo" } , { "str" : "bar" }]'),
    ).toBe(true)
  })

  test('isConvertibleToArray return true on pass "{ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }"', () => {
    expect(
      isConvertibleToArray(
        '{ "str" : "foo", "num" : 45, "obj" : { "bool" : true } }',
      ),
    ).toBe(false)
  })

  test('isConvertibleToArray return false on pass not array string', () => {
    expect(isConvertibleToArray('foo')).toBe(false)
  })

  test('isConvertibleToArray return false on pass empty string', () => {
    expect(isConvertibleToArray('')).toBe(false)
  })
})

describe('isConvertibleToObject()', () => {
  test('isConvertibleToObject return true on pass "{}"', () => {
    expect(isConvertibleToObject('{}')).toBe(true)
  })

  test('isConvertibleToObject return true on pass "{ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }"', () => {
    expect(
      isConvertibleToObject(
        '{ "str" : "foo", "num" : 45, "obj" : { "bool" : true } }',
      ),
    ).toBe(true)
  })

  test('isConvertibleToObject return false on pass "[{ "str" : "foo" } , { "str" : "bar" }]"', () => {
    expect(
      isConvertibleToObject('[{ "str" : "foo" } , { "str" : "bar" }]'),
    ).toBe(false)
  })

  test('isConvertibleToObject return false on pass "[ 123 , "foo" , true , null]"', () => {
    expect(isConvertibleToObject('[ 123 , "foo" , true , null]')).toBe(false)
  })

  test('isConvertibleToObject return false on pass not object string', () => {
    expect(isConvertibleToObject('foo')).toBe(false)
  })

  test('isConvertibleToObject return false on pass empty string', () => {
    expect(isConvertibleToObject('')).toBe(false)
  })
})

describe('isConvertibleToNull()', () => {
  test('isConvertibleToNull return true on pass "null"', () => {
    expect(isConvertibleToNull('null')).toBe(true)
  })

  test('isConvertibleToNull return false on pass not null string', () => {
    expect(isConvertibleToNull('foo')).toBe(false)
  })

  test('isConvertibleToNull return false on pass empty string', () => {
    expect(isConvertibleToNull('')).toBe(false)
  })
})

describe('isConvertibleToUndefined()', () => {
  test('isConvertibleToUndefined return true on pass "undefined"', () => {
    expect(isConvertibleToUndefined('undefined')).toBe(true)
  })

  test('isConvertibleToUndefined return false on pass not undefined string', () => {
    expect(isConvertibleToUndefined('foo')).toBe(false)
  })

  test('isConvertibleToUndefined return false on pass empty string', () => {
    expect(isConvertibleToUndefined('')).toBe(false)
  })
})

describe('convertToBool()', () => {
  test('convertToBool return true on pass "true"', () => {
    expect(convertToBool('true')).toBe(true)
  })

  test('convertToBool return false on pass "false"', () => {
    expect(convertToBool('false')).toBe(false)
  })
})

describe('convertToDate()', () => {
  momentConvertiblePatterns.forEach(pattern => {
    test(`convertToDate return Date on pass "${pattern}"`, () => {
      expect(convertToDate(pattern).toUTCString()).toBe(
        moment(pattern)
          .toDate()
          .toUTCString(),
      )
    })
  })
})

describe('convertToArray()', () => {
  test('convertToArray return array on pass "[ 123 , 45 , 147.56 , -147.56]"', () => {
    expect(
      convertToArray<number>('[ 123 , 45 , 147.56 , -147.56]'),
    ).toStrictEqual([123, 45, 147.56, -147.56])
  })

  test('convertToArray return array on pass "[{ "str" : "foo" } , { "str" : "bar" }]"', () => {
    expect(
      convertToArray<{ str: string }>(
        '[{ "str" : "foo" } , { "str" : "bar" }]',
      ),
    ).toStrictEqual([{ str: 'foo' }, { str: 'bar' }])
  })
})

describe('convertToObject()', () => {
  test('convertToObject return {} on pass "{}"', () => {
    expect(convertToObject<{}>('{}')).toStrictEqual({})
  })

  test('convertToObject return object on pass "{ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }"', () => {
    expect(
      convertToObject<{ str: string; num: number; obj: { bool: boolean } }>(
        '{ "str" : "foo", "num" : 45, "obj" : { "bool" : true } }',
      ),
    ).toStrictEqual({ str: 'foo', num: 45, obj: { bool: true } })
  })
})
