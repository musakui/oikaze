import * as symbols from './symbol.js'
import { isObject, isString, joinIfArray } from './lodash.js'

export { symbols }

/**
 * helper to create a CSSObject
 *
 * @param {import('../types').CSSObject} obj
 */
export function cssObj(obj) {
	return obj
}

/**
 * helper to create a CSSObject
 *
 * @param {Partial<import('../types').CSSObject>} obj
 */
export function partObj(obj) {
	return obj
}

/**
 * create a custom CSS property declaration
 *
 * @param {string} name property name
 * @param {string | import('../types').CustomPropertyOpts} [opts] fallback value or `@property` declaration
 * @return {import('../types').CSSVar}
 */
export function _var(name, opts) {
	const ref = `var(${name})`

	if (!opts || isString(opts)) {
		return {
			[symbols.token]: name,
			// default value provided
			...(opts ? { [name]: opts } : null),
			[Symbol.toPrimitive]: () => ref,
		}
	}

	const init = opts?.initial
	return {
		[symbols.token]: name,
		// default value provided
		[symbols.selector]: `@property ${name}`,
		syntax: `"${opts?.syntax || '*'}"`,
		inherits: `${!!opts?.inherits}`,
		...(init ? { 'initial-value': init } : null),
		[Symbol.toPrimitive]: () => ref,
	}
}

/**
 * @param {TemplateStringsArray} strs
 * @param {...unknown} vals
 * @return {import('../types').CSSVar}
 */
export function _vs(strs, ...vals) {
	const o = [strs[0], ...strs.slice(1).flatMap((s, i) => [vals[i], s])].join('')
	return {
		...Object.fromEntries(getVars(vals)),
		[symbols.token]: vals
			.flatMap((v) => {
				return isObject(v) && symbols.token in v ? [v[symbols.token]] : []
			})
			.join(','),
		[Symbol.toPrimitive]: () => o,
	}
}

/**
 * render a CSSObject to a string
 *
 * @param {import('../types').CSSObject} obj
 */
export function render(obj) {
	// base body
	const body =
		obj[symbols.body] ??
		Object.entries(obj)
			.flatMap(([k, v]) => (v != null ? [`${k}: ${v}`] : []))
			.join('; ')

	// wrap from inside out
	return [
		// nested selectors
		...(obj[symbols.nest] ?? []),
		// main selector
		joinIfArray(obj[symbols.selector]) ?? `.${cssEscape(obj[symbols.token])}`,
	].reduce((b, s) => `${s} { ${b} }`, body)
}

// mini escape for selector names
const escapeCssRE = /[^-_\w]/g
const leadingDashDigit = /(?<=^-?)\d/

/** @param {string} str */
export function cssEscape(str) {
	if (str === '-') return '\\-'
	return str
		.replace(escapeCssRE, '\\$&') // prepend backslash
		.replace(leadingDashDigit, '\\3$&') // leading 0-9 to hex escape
}

/** @param {unknown[]} vals */
function* getVars(vals) {
	for (const val of vals) {
		if (!isObject(val)) continue
		yield* Object.entries(val)
	}
}
