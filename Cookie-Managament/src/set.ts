import { autoCast } from './commonTypes'
import { is } from './utility'

const secondsOfOneDay = 864e2
const millisecondsOfOneDay = 864e5

/**
   Considers RFC 6265 section 5.2:
    ...
    3.  If the remaining unparsed-attributes contains a %x3B (";")
        character:
   Consume the characters of the unparsed-attributes up to,
    not including, the first %x3B (";") character.
    ...
 */
const removeSemicolon = (s: string): string => s.split(';')[0]

/**
 Considers RFC 6265 section 4.1.1:
 ...
 cookie-name = token
 token = <token, defined in [RFC2616], Section 2.2>
 ...

 RFC 2616 section 2.2:
 ...
 CHAR = <any US-ASCII character (octets 0 - 127)>
 ...
 CTL = <any US-ASCII control character
 (octets 0 - 31) and DEL (127)>
 ...
 token = 1*<any CHAR except CTLs or separators>
 separators = "(" | ")" | "<" | ">" | "@"
          | "," | ";" | ":" | "\" | <">
          | "/" | "[" | "]" | "?" | "="
          | "{" | "}" | SP | HT
 ...

 allowed in the cookie-name "#","$","%","&","+","^","`","|"
 but "%" don't replace
 */
const encodeKey = (key: string): string =>
  encodeURIComponent(key)
    .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
    // encodeURIComponent() don't encoding "(" and ")"
    .replace(/(\()/g, '%28')
    .replace(/(\))/g, '%29')

/**
 Considers RFC 6265 section 4.1.1:
 ...
 cookie-value = *cookie-octet / ( DQUOTE *cookie-octet DQUOTE )
 cookie-octet = %x21 / %x23-2B / %x2D-3A / %x3C-5B / %x5D-7E
        ; US-ASCII characters excluding CTLs,
        ; whitespace DQUOTE, comma, semicolon,
        ; and backslash
 ...
 */
const encodeValue = (value: string): string =>
  encodeURIComponent(value).replace(
    /%(21|23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
    decodeURIComponent,
  )

export interface CookieAttributes {
  readonly expires?: number | Date
  readonly path?: string
  readonly domain?: string
  readonly secure?: boolean
  readonly maxAge?: number
  readonly samesite?: 'strict' | 'lax'
}

const createStringAttribute = (attributes: CookieAttributes) => {
  let stringAttributes = ''
  let expires = ''
  if (attributes.expires !== undefined) {
    const expiresDate =
      attributes.expires instanceof Date
        ? attributes.expires
        : new Date(Date.now() + attributes.expires * millisecondsOfOneDay)
    expires = expiresDate.toUTCString()
  }
  const path = attributes.path || ''
  const domain = attributes.domain || ''
  const isSecure = attributes.secure || false
  const maxAge =
    attributes.maxAge !== undefined
      ? `${attributes.maxAge * secondsOfOneDay}`
      : ''
  const samesite = attributes.samesite || ''

  stringAttributes +=
    expires || path || domain || isSecure || maxAge || samesite ? '; ' : ''
  stringAttributes += expires
    ? `${nameof<CookieAttributes>(o => o.expires)}=${expires}; `
    : ''
  stringAttributes += path
    ? `${nameof<CookieAttributes>(o => o.path)}=${removeSemicolon(path)}; `
    : ''
  stringAttributes += domain
    ? `${nameof<CookieAttributes>(o => o.domain)}=${removeSemicolon(domain)}; `
    : ''
  stringAttributes += isSecure
    ? `${nameof<CookieAttributes>(o => o.secure)}; `
    : ''
  // cannot naming CookieAttributes.max-age
  stringAttributes += maxAge ? `max-age=${maxAge}; ` : ''
  stringAttributes += samesite
    ? `${nameof<CookieAttributes>(o => o.samesite)}=${samesite}; `
    : ''

  return stringAttributes
}

const set = (
  key: string,
  value: autoCast<any, {}>,
  attributes?: CookieAttributes,
): string => {
  if (typeof document === 'undefined') {
    return ''
  }

  let stringAttributes = ''
  if (attributes !== undefined)
    stringAttributes = createStringAttribute(attributes)

  let cookieValue = ''
  if (is.date(value)) {
    cookieValue = value.toUTCString()
  } else if (is.arr(value) || is.obj(value)) {
    cookieValue = JSON.stringify(value)
  } else {
    cookieValue = `${value}`
  }

  return (document.cookie = `${encodeKey(key)}=${encodeValue(
    cookieValue,
  )}${stringAttributes}`)
}

export default set
