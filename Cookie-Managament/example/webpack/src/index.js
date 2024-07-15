import cookie from 'pocket-cookie'

/**
 * Basic Usage
 */

// json
const json = { str: 'foo', num: 45, obj: { bool: true } }
cookie.set('json', json)
let result = cookie.getWithAutoCast('json')
console.log(result)
// => result === {str:'foo', num:45 , obj:{ bool:true } }

// array
const array = [{ str: 'foo' }, { str: 'bar' }]
cookie.set('array', array)
result = cookie.getWithAutoCast('array')
console.log(result)
// => result === [{ str : "foo" } , { str : "bar" }]

// string
const str = 'foo'
cookie.set('str', str)
result = cookie.getWithAutoCast('str')
console.log(result)
// => result === 'foo'

// number
const num = 123.45
cookie.set('num', num)
result = cookie.getWithAutoCast('num')
console.log(result)
// => result === 123.45

// boolean
const bool = true
cookie.set('bool', bool)
result = cookie.getWithAutoCast('bool')
console.log(result)
// => result === true

// null
const nullValue = null
cookie.set('null', nullValue)
result = cookie.getWithAutoCast('null')
console.log(result)
// => result === null

// undefined
const undefinedValue = undefined
cookie.set('undefined', undefinedValue)
result = cookie.getWithAutoCast('undefined')
console.log(result)

/*
 *  get api
 */
document.cookie = 'foo=bar'
console.log(cookie.get('foo')) // =>  "bar"
document.cookie = 'bar=123'
console.log(cookie.get('bar')) // =>  "123"
document.cookie = 'zero=0'
console.log(cookie.get('zero')) // =>  "0"
document.cookie = 'null=null'
console.log(cookie.get('null')) // =>  "null"
document.cookie = 'undefined=undefined'
console.log(cookie.get('undefined')) // =>  "undefined"
// not exist cookie return null
console.log(cookie.get('notExist')) // =>  null

cookie.clearAll()

/*
 *  getWithAutoCast api
 */
document.cookie = 'foo=bar'
const foo = cookie.getWithAutoCast('foo')
console.log(foo) // => foo === "bar" and typeof foo === 'string'

document.cookie = 'number=123.45'
const number = cookie.getWithAutoCast('number')
console.log(number) // => number === 123.45 and typeof number === 'number'

document.cookie = 'bool=true'
// const bool = cookie.getWithAutoCast('bool')
console.log(bool) // => bool === true and typeof bool === 'boolean'

// parsable date format pattern is moment.js default parsable pattern
// more details => https://momentjs.com/docs/#/parsing/string/
document.cookie = 'date=2013-02-08T09'
const date = cookie.getWithAutoCast('date')
console.log(date.toUTCString()) // => date.toUTCString() === "Fri, 08 Feb 2013 00:00:00 GMT" and (date instanceof Date) === true

document.cookie = 'arr=[{ "str" : "foo" } , { "str" : "bar" }]'
const arr = cookie.getWithAutoCast('arr')
console.log(arr) // => arr === [{ str : "foo" } , { str : "bar" }] and Array.isArray(arr) === true

document.cookie =
  'obj={ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }'
const obj = cookie.getWithAutoCast('obj')
console.log(obj) // => obj === {str:'foo', num:45 , obj:{ bool:true } } and typeof obj === 'object'

document.cookie = 'null=null'
const nullCookie = cookie.getWithAutoCast('null')
console.log(nullCookie) // => nullCookie === null

document.cookie = 'undefined=undefined'
const undefinedCookie = cookie.getWithAutoCast('undefined')
console.log(undefinedCookie) // => undefinedCookie === undefined and typeof undefinedCookie === 'undefined'

// not exist cookie return null
console.log(cookie.getWithAutoCast('notExist')) // =>  null

cookie.clearAll()

/*
 *  getKeyValuePairs api
 */
document.cookie = 'foo=bar'
console.log(cookie.getKeyValuePairs()) // =>  [{ key: 'foo', value: 'bar' }]

cookie.clearAll()

document.cookie = 'foo=bar'
document.cookie = 'baz=qux'
console.log(cookie.getKeyValuePairs()) // =>  [{ key: 'foo', value: 'bar' },{ key: 'baz', value: 'qux' }]

// return empty array on cookie is empty
cookie.clearAll()
console.log(cookie.getKeyValuePairs()) // =>  []

/*
 *  clearAll api
 */
document.cookie = 'foo=bar'
document.cookie = 'bar=123'
cookie.clearAll()
console.log(document.cookie) // =>  ""

// clear
cookie.set('foo', 'bar')
cookie.clear('foo')
console.log(cookie.get('foo')) // =>  null
// Delete a cookie valid to the path of the current page

cookie.set('c', 'bar', { path: '/index.html' })
cookie.clear('c') // fail!
console.log(cookie.get('c')) // =>  'bar'
cookie.clear('c', { path: '/index.html' }) // removed!
console.log(cookie.get('c')) // =>  null

// cannot clear HttpOnly flag set cookies and path set cookies
const dt = new Date('1999-12-31T23:59:59Z') // past dateTime

document.cookie = 'a=b'
console.log(document.cookie)
document.cookie = `a=; expires=${dt.toUTCString()}; `
console.log(document.cookie)

document.cookie = 'c=d'
console.log(document.cookie)
cookie.clearAll()
console.log(document.cookie)

document.cookie = 'e=f; path=/index.html; '
console.log(document.cookie)
cookie.clearAll() // fail!
console.log(document.cookie)

document.cookie = `e=; path=/index.html; expires=${dt.toUTCString()}; `
console.log(document.cookie) // removed!

cookie.set('foo', 'bar', {
  expires: 365,
  path: '/index.html',
  domain: 'localhost', // <= this environment cannot test
  // secure: true, // <= this environment cannot test if secure=true, cannot set cookie
  maxAge: 300, // <=  priority over expires
  samesite: 'lax',
})
console.log(cookie.get('foo'))

document.cookie = `foo=; path=/index.html; expires=${dt.toUTCString()}; `
console.log(document.cookie) // removed!
