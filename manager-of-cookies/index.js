const isBrowser = typeof window !== 'undefined'

/**
 * @property {object} cookie - Has methods for handling cookie related tasks
 * @property {function}	cookie.set - Store a keyed value with expiration date as a cookie
 * @property {function}	cookie.get - Get and extracts the value of a keyed cookie
 * @property {function} cookie.destroy - Destroy a cookie by key, utilizes cookie.set
 * @property {function} cookie.check - Check if a cookie is stores by key, utilizes cookie.get 
 */
const cookie = {

	/**
	 * Packages and sets a cookie by provided params
	 * @function set
	 * @param {String} key - Id/key of the cookie
	 * @param {*} value - Value to be includes
	 * @param {Object} [options] - Options for additional configuring
	 * @param {Number} [options.days] - Set the expiration date in days
	 * @param {String} [options.path] - Indicates a URL path
	 * @default options.days? = 7
	 * @default options.path? = '/'
	 */
	set: (key, value, options = {}) => {
		if(!isBrowser) return
	
		// sets the default values of _options_ if none was provided
		const { 
			days = 7, 
			path = '/'
		} = options
	
		const DayInSec = 864e5
		
		const expires = new Date(
			Date.now() + days * DayInSec
		).toUTCString()
	
		document.cookie =
			key +
			'=' +
			encodeURIComponent(value) +
			'; expires=' +
			expires +
			'; path=' +
			path
	},
	
	/**
	 * Fetches cookie by key and extracts value
	 * @function get
	 * @param {String} key - Id/key of the cookie
	 * @param {*} [initialValue] - Value to be returned if no cookie were found
	 * @return value | _initalValue_
	 */
	get: (key, initialValue) => (
		(isBrowser &&
			document.cookie
			.split('; ')
			.reduce((r, v) => {
				const parts = v.split('=')
				return parts[0] === key ? decodeURIComponent(parts[1]) : r
			}, '')
		) || initialValue
	),
	
	
	/**
	 * Checks if a cookie by the given key exists. Utilizes _get_
	 * @function check
	 * @param key - The key of the targeted cookie
	 * @return {Boolean} - boolean
	 */
	check: key => cookie.get(key) ? true : false,
	
	/**
	 * Destroys a cookie by overwriting it, utilizes _set_ and a expiration date of yesterday
	 * @function destroy
	 * @param key - The key of the targeted cookie
	 */
	destroy: key => cookie.set(key,"",{days: -1}),
}

module.exports = cookie