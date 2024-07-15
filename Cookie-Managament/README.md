# pocket-cookie

A JavaScript cookie library

 - simple api ([get](#get),[set](#set),[clear](#clear),[clearAll](#clearAll))
 - support auto type cast api ([getWithAutoCast](#getwithautocast))
 - includes `d.ts`
 - esm
 - utility api ([getKeyValuePairs](#getKeyValuePairs))

## installation

npm

```bash
$ npm install -S pocket-cookie
```

or yarn

```bash
$ yarn add pocket-cookie
```

import your source code

```javascript
    import cookie from 'pocket-cookie'
```

## Basic Usage

 - set cookie and get cookie
 - pocket-cookie is cast to string from any types on set()
 - and auto cast to original type on getWithAutoCast()

```javascript
    import cookie from 'pocket-cookie'

    // json
    const json = {str:'foo', num:45 , obj:{ bool:true } }
    cookie.set('json', json)
    let result = cookie.getWithAutoCast('json')  
    // => result === {str:'foo', num:45 , obj:{ bool:true } }

    // array
    const array = [{ str : "foo" } , { str : "bar" }]
    cookie.set('array', array)
    result = cookie.getWithAutoCast('array')  
    // => result === [{ str : "foo" } , { str : "bar" }]

    // string
    const str = 'foo'
    cookie.set('str', str)
    result = cookie.getWithAutoCast('str')  
    // => result === 'foo'

    // number
    const num = 123.45
    cookie.set('num', num)
    result = cookie.getWithAutoCast('num')  
    // => result === 123.45

    // boolean
    const bool = true
    cookie.set('bool', bool)
    result = cookie.getWithAutoCast('bool')  
    // => result === true

    // null
    const nullValue = null
    cookie.set('null', nullValue)
    result = cookie.getWithAutoCast('null')  
    // => result === null

    // undefined
    const undefinedValue = undefined
    cookie.set('undefined', undefinedValue)
    result = cookie.getWithAutoCast('undefined')  
    // => result === undefined
```

## API Reference

### get

simple get cookie api return `string` value

```javascript
    import cookie from 'pocket-cookie'

    document.cookie = 'foo=bar'
    cookie.get('foo')  // =>  "bar"

    document.cookie = 'bar=123'
    cookie.get('bar')  // =>  "123"

    document.cookie = 'zero=0'
    cookie.get('zero')  // =>  "0"

    document.cookie = 'null=null'
    cookie.get('null')  // =>  "null"

    document.cookie = 'undefined=undefined'
    cookie.get('undefined')  // =>  "undefined"

    //not exist cookie return null
    cookie.get('notExist')  // =>  null
```

### set

create cookie

```javascript
    import cookie from 'pocket-cookie'

    cookie.set('foo', 'bar')
    console.log(document.cookie)   // =>  "foo=bar"
```

with CookieAttributes
 - **Note** If you both are set expires and maxAge, priority to maxAge over expires
 - more details of CookieAttributes => [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

```javascript
    import cookie from 'pocket-cookie'
    
    cookie.set('foo', 'bar', {
        expires: 365,   // expires is 365days
        path: '/index.html',
        domain: 'example.com',
        secure: true,
        maxAge: 200,  // max-age is 200days 
        samesite: 'strict',
    })
```

### getWithAutoCast

get cookie and auto type cast api
 - Automatically determine the recommended type from the string value
 - support types
   - `string` `number` `boolean` `Date` `Array` `JSON` `null` `undefined`
 - **Note** this method is priority to date over number

```javascript
    import cookie from 'pocket-cookie'

    document.cookie = 'foo=bar'
    const foo = cookie.getWithAutoCast('foo')  // => foo === "bar" and typeof foo === 'string'

    document.cookie = 'number=123.45'
    const number = cookie.getWithAutoCast('number')  // => number === 123.45 and typeof number === 'number'

    document.cookie = 'bool=true'
    const bool = cookie.getWithAutoCast('bool')  // => bool === true and typeof bool === 'boolean'

    // parsable date format pattern is moment.js default parsable pattern
    // more details => https://momentjs.com/docs/#/parsing/string/
    document.cookie = 'date=2013-02-08T09'
    const date = cookie.getWithAutoCast('date')  // => date.toUTCString() === "Fri, 08 Feb 2013 00:00:00 GMT" and (date instanceof Date) === true

    document.cookie = 'arr=[{ "str" : "foo" } , { "str" : "bar" }]'
    const arr = cookie.getWithAutoCast('arr')  // => arr === [{ str : "foo" } , { str : "bar" }] and Array.isArray(arr) === true

    document.cookie = 'obj={ "str" : "foo", "num" : 45 , "obj" : { "bool" : true } }'
    const obj = cookie.getWithAutoCast('obj')  // => obj === {str:'foo', num:45 , obj:{ bool:true } } and typeof obj === 'object'

    document.cookie = 'null=null'
    const nullCookie = cookie.getWithAutoCast('null')  // => nullCookie === null

    document.cookie = 'undefined=undefined'
    const undefinedCookie = cookie.getWithAutoCast('undefined')  // => undefinedCookie === undefined and typeof undefinedCookie === 'undefined'

    //not exist cookie return null
    cookie.getWithAutoCast('notExist')  // =>  null
```

### getKeyValuePairs

all cookies to object KeyValuePair

```javascript
    import cookie from 'pocket-cookie'

    document.cookie = 'foo=bar'
    cookie.getKeyValuePairs()  // =>  [{ key: 'foo', value: 'bar' }]

    cookie.clearAll()

    document.cookie = 'foo=bar'
    document.cookie = 'baz=qux'
    cookie.getKeyValuePairs()  // =>  [{ key: 'foo', value: 'bar' },{ key: 'baz', value: 'qux' }]

    // return empty array on cookie is empty
    cookie.clearAll()
    cookie.getKeyValuePairs()  // =>  []
```

keyValuePair type is simple jsonObject

```typescript

type keyValuePair = {
  key: string
  value: string
}

```

### clear

```javascript
    import cookie from 'pocket-cookie'

    cookie.set('foo','bar')
    cookie.clear('foo')
    cookie.get('foo')   // =>  null
```

- Delete a cookie valid to the path of the current page

```javascript
    import cookie from 'pocket-cookie'

    cookie.set('foo','bar',{path:'/index.html'})
    cookie.clear('foo')  // fail!
    cookie.get('foo')   // =>  'bar'
    cookie.clear('foo',{path:'/index.html'})  // removed!
    cookie.get('foo')   // =>  null
```

### clearAll

```javascript
    import cookie from 'pocket-cookie'

    document.cookie = 'foo=bar'
    document.cookie = 'bar=123'
    cookie.clearAll()
    console.log(document.cookie)   // =>  ""
```

**Note** cannot clear HttpOnly flag set cookies and path set cookies

```javascript
    import cookie from 'pocket-cookie'

   cookie.set('foo','bar',{path:'/index.html'})
   cookie.clearAll()
   console.log(document.cookie)   // =>  "foo=bar"
   // please use cookie.clear('foo' , {path:'/index.html'})
```

## Encoding
This project is [RFC 6265](https://tools.ietf.org/html/rfc6265#section-4.1.1) compliant

## development

```bash
$ git clone https://github.com/aclearworld/pocket-cookie.git
$ cd pocket-cookie
$ npm ci
$ npm run build
```

## this library using any awesome tools

 - rollup
 - jest
 - babel
 - TypeScript
 - eslint
 - husky
 - prettier

thanks developers

## License
 - MIT License

## Authors

 - [kotatu810](https://github.com/aclearworld)
