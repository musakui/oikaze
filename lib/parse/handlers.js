import { _var, _vs } from '../util/css.js'
import { isFunction, isString, mapUnit } from '../util/lodash.js'
import { defaultColors, defaultContainerRem } from './defaults.js'

/** @typedef {Record<string, unknown>} Context */

const pixelRE = /^\d+px$/
const percentRE = /^\d+%$/
const numberRE = /^(:?-?\d*.)?\d+$/
const fractionRE = /^(\d+)\/(\d+)$/
const rawValueRE = /^\[([^\]]+)\]$/
const tshirtRE = /^(\d?xs|sm|md|lg|\d?xl)$/
const cssVarRE = /^\((?:([a-z]+):)?(--[\w-]+)\)$/

const entireStringRE = /^.+$/

const escapedUnderscoresRE = /\\_/g
const unescapedUnderscoresRE = /(?<!\\)_/g

const consecutiveRE = /0{4}|9{4}/

/** @type {Record<string, string>} */
const screens = { inline: 'w', block: 'h' }

const containers = mapUnit('rem', defaultContainerRem)

export const h = makeParser()

/** @satisfies {Record<string, (s: string, c?: Context) => unknown>} */
export const basic = {
	/** passthrough fallback */
	_: (s) => s,

	/** hyphenated string into space seperated */
	split: (s) => s.split('-').join(' '),

	/** append `-box` */
	box: (s) => `${s}-box`,

	/** global keywords (e.g. `inherit`) */
	global: exact('inherit', 'initial', 'revert', 'revert-layer', 'unset'),

	/** CSS custom properties `(--name)` */
	cssvar(s) {
		const m = cssVarRE.exec(s)
		if (m) return `var(${m[2]})`
	},

	/**
	 * arbitrary values `[...]`
	 *
	 * `_` will be converted to spaces unless escaped
	 */
	raw(s) {
		const m = rawValueRE.exec(s)
		if (m) return restoreSpaces(m[1])
	},

	/**
	 * arbitrary values `[...]`
	 *
	 * `_` will not be converted
	 */
	rawPreserve(s) {
		const m = rawValueRE.exec(s)
		if (m) return m[1]
	},

	/** plain number */
	number(str, ctx) {
		const n = rawNumber(str)
		if (n !== null) return `${round(n * negative(ctx))}`
	},

	/** number as px */
	px(str, ctx) {
		if (str === 'px') return !ctx?.n ? '1px' : '-1px'
		const m = pixelRE.exec(str)
		if (m) return str
		const n = rawNumber(str)
		if (n !== null) return `${round(n * negative(ctx))}px`
	},

	/** number as percentage */
	percent(str, ctx) {
		const pm = percentRE.exec(str)
		if (pm) return str
		const n = rawNumber(str)
		if (n !== null) return `${round(n * negative(ctx))}%`
	},

	/** `number/number` as-is */
	ratio(str) {
		const m = str.match(fractionRE)
		if (m) return `${m[1]} / ${m[2]}`
	},

	/** `number/number` as the rounded computed value */
	fraction(str) {
		const fr = rawFraction(str)
		if (fr !== null) return `${round(fr)}`
	},

	/** `number/number` as a percentage */
	fractionAsPercent(str) {
		const m = str.match(fractionRE)
		if (m) return `calc(${m[1]} / ${m[2]} * 100%)`
	},

	/** content fit */
	content: lookup({
		min: 'min-content',
		max: 'max-content',
		fit: 'fit-content',
	}),

	/** `100vh` or `100vw` depending on `ctx.d` */
	screen(str, ctx) {
		const d = ctx?.d
		if (d && str === 'screen') {
			return `100v${screens[`${d}`] ?? d}`
		}
	},

	/** spacing value */
	spacing(str, ctx) {
		if (str === 'full') return !ctx?.n ? '100%' : '-100%'
		const v = rawNumber(str)
		if (v !== null) {
			return !ctx?.n && v === 1
				? 'var(--spacing)'
				: `calc(var(--spacing) * ${negative(ctx) * v})`
		}
	},

	/** container shirt size */
	container: tShirt((s) => _var(`--container-${s}`, containers[s])),
}

export const withParam = {
	/** match exactly the given list of strings */
	exact,

	/** lookup a value from a record */
	lookup,

	/**
	 * perform `String.replace`
	 *
	 * @param {string | RegExp} pattern string or RegEx to search for
	 * @param {string | ((s: string, ...p: string[]) => string)} replacement string or replacer function
	 */
	replace(pattern, replacement) {
		/** @param {string} str */ // @ts-expect-error
		return (str) => str.replace(pattern, replacement)
	},

	/**
	 * rewrite the entire value using `String.replace`
	 *
	 * @param {string | ((s: string, ...p: string[]) => string)} replacement string or replacer function
	 */
	rewrite(replacement) {
		/** @param {string} str */ // @ts-expect-error
		return (str) => str.replace(entireStringRE, replacement)
	},

	/**
	 * convert a value into a css variable family
	 *
	 * @param {string} name variable family name
	 * @param {Record<string, string>} [defaults]
	 */
	asVar(name, defaults) {
		/** @param {string} str */
		return (str) => _var(`--${name}-${str}`, defaults?.[str])
	},

	/**
	 * converts a number into the given string format
	 *
	 * use `\0` (null character) as the placeholder (multiple allowed)
	 *
	 * @param {string | ((n: number) => string)} convert template string or function
	 */
	numberTo(convert) {
		const c = isFunction(convert)
			? convert
			: /** @param {number} n */ (n) => convert.replaceAll('\0', `${round(n)}`)

		/**
		 * @param {string} str
		 * @param {Context} ctx
		 */
		return (str, ctx) => {
			const n = rawNumber(str)
			if (n !== null) return c(n * negative(ctx))
		}
	},

	/**
	 * converts a t-shirt size into the given string format
	 *
	 * use `\0` (null character) as the placeholder (only the first will be replaced)
	 *
	 * @param {string | ((s: string) => string)} fn template string or function
	 */
	tshirtTo(fn) {
		return tShirt(isFunction(fn) ? fn : (s) => fn.replace('\0', s))
	},

	/**
	 * converts a t-shirt size into a css variable
	 *
	 * @param {string} name
	 * @param {Record<string, string>} [defaults]
	 */
	tshirtVar(name, defaults) {
		return tShirt((s) => _var(`--${name}-${s}`, defaults?.[s]))
	},

	/**
	 * @param {{ type?: string, defaults?: Record<string, string> }} opts
	 */
	cssvarOf(opts) {
		const t = opts?.type

		/** @param {string} str */
		return (str) => {
			const m = cssVarRE.exec(str)
			if (m && (!t || m[1] === t)) {
				const n = m[2]
				return _var(n, opts?.defaults?.[n])
			}
		}
	},
}

/** @param {number} n */
function round(n) {
	// TODO nstr
	return +n.toFixed(5)
}

/** @param {Context} [ctx] */
function negative(ctx) {
	return !!ctx?.n ? -1 : 1
}

/**
 * match exactly the given list of strings
 *
 * @param {...string} vals
 */
function exact(...vals) {
	if (vals.length === 1) {
		const v = vals[0]
		/** @param {string} str */
		return (str) => {
			if (v === str) return str
		}
	}
	const st = new Set(vals)
	/** @param {string} str */
	return (str) => {
		if (st.has(str)) return str
	}
}

/**
 * lookup a value from a record
 *
 * @param {Partial<Record<string, string>>} lut
 */
function lookup(lut) {
	/** @param {string} str */
	return (str) => lut[str]
}

/** @param {string} str */
function rawNumber(str) {
	if (!numberRE.test(str)) return null
	const n = Number.parseFloat(str)
	if (Number.isNaN(n)) return null
	return Number.isInteger(n) ? n : n
}

/** @param {string} str */
function rawFraction(str) {
	const m = str.match(fractionRE)
	if (!m) return null
	const val = parseInt(m[1]) / parseInt(m[2])
	return Number.isNaN(val) ? null : val
}

/**
 * @template T
 * @param {(s: string) => T} converter
 */
function tShirt(converter) {
	/** @param {string} str */
	return (str) => {
		if (tshirtRE.test(str)) return converter(str)
	}
}

/**
 * @param {...(import('./types').BaseParser)} _h
 * @returns {import('./types').Parser<undefined>}
 */
function makeParser(..._h) {
	/**
	 * @param {string} str
	 * @param {Context} ctx
	 */
	function parse(str, ctx) {
		for (const h of _h) {
			const v = h(str, ctx)
			if (v !== null && v !== undefined) return v
		}
	}

	// @ts-expect-error
	return new Proxy(parse, {
		get(_, prop) {
			if (!isString(prop)) return

			if (prop in withParam) {
				// @ts-expect-error
				return (...a) => makeParser(..._h, withParam[prop](...a))
			}

			// @ts-expect-error
			return makeParser(..._h, basic[prop] ?? exact(prop))
		},
	})
}

export const sides = /** @type {Record<string, string>} */ ({
	x: 'inline',
	y: 'block',
	s: 'inline-start',
	e: 'inline-end',
	bs: 'block-start',
	be: 'block-end',
	t: 'top',
	r: 'right',
	b: 'bottom',
	l: 'left',
})

/**
 * @param {string} prop
 * @param {keyof typeof sides} [side]
 */
export function getSideName(prop, side) {
	return side ? `${prop}-${sides[side]}` : prop
}

// prettier-ignore
const pColor = h.inherit.transparent.lookup({ current: 'currentColor' }).cssvar.raw
const pAlpha = h.percent.cssvar.raw

/**
 * @param {string} value
 * @param {Context} [ctx]
 */
export function parseColor(value, ctx) {
	const base = pColor(value)
	if (base) return base

	const col = _var(`--color-${value}`, defaultColors[value])
	const alp = isString(ctx?.a) ? pAlpha(ctx.a) : null

	if (!alp) return col

	return _vs`color-mix(in oklab, ${col} ${alp}, transparent)`
}

/**
 * @param {string} str
 */
export function restoreSpaces(str) {
	return str
		.replace(unescapedUnderscoresRE, ' ')
		.replace(escapedUnderscoresRE, '_')
}
