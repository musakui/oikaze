import { partObj, symbols } from '../util/css.js'
import { isString, isFunction } from '../util/lodash.js'
import { defineHandler, defineRule } from '../util/rule.js'

/**
 * static utilities (single output per token)
 *
 * @param {string} name utility name (full)
 * @param {string | ReturnType<typeof partObj>} propOrObj the CSS property to use, or a custom object
 * @param {string | number} [val] value to use (default is same as name)
 */
export function defineStaticUtility(name, propOrObj, val) {
	const obj = isString(propOrObj) ? { [propOrObj]: val ?? name } : propOrObj
	return defineRule(name, obj, { name })
}

/**
 * utilities of the form `some-name-value` that generate
 * ```css
 * { some-name: value }
 * ```
 *
 * @param {string} name utility name (prefix)
 * @param {string | null | import('./types').UtilityOptions} [opts] the CSS property to use, or options
 * @param {import('./types').BaseParser} [parser] parser if opts is a property
 */
export function defineUtility(name, opts, parser) {
	// opts is property
	if (!opts || isString(opts)) {
		const p = opts ?? name
		const r = parser ?? ((s) => s)
		const handler = defineHandler((m) => ({ [p]: r(m[1]) }))
		return defineRule(`${name}-`, handler, { name })
	}

	const matcher =
		opts.matcher ??
		(opts.negatable
			? new RegExp(`^(-)?${name}-(.+)$`)
			: opts.modifiable
				? new RegExp(`^${name}-([^\\/]+)(?:\\/(.+))?$`)
				: `${name}-`)

	if (opts.handler) {
		return defineRule(matcher, opts.handler, { name })
	}

	/** @type {typeof opts.context} */
	const c =
		opts.context ??
		(opts.negatable
			? (m) => [m[2], { n: m[1] }]
			: opts.modifiable
				? (m) => [m[1], { a: m[2] }]
				: (m) => [m[1]])

	if (opts.cases?.length) {
		const cases = opts.cases
		const handler = defineHandler((m, o) => {
			const [str, ctx] = c(m, o)
			for (const [p, parser, ext] of cases) {
				const val = parser(str, ctx)
				if (!val) continue
				const out = { ...o, [p]: val }
				return ext ? ext(m, out) : out
			}
			return {}
		})
		return defineRule(matcher, handler, { name })
	}

	const p = opts.prop ?? name
	const r = opts.parser ?? ((s) => s)
	const handler = defineHandler(
		isFunction(p)
			? (m, o) => ({ [p(m)]: r(...c(m, o)) })
			: (m, o) => ({ [p]: r(...c(m, o)) }),
	)

	return defineRule(matcher, handler, { name })
}

/**
 * variants that cause utilities to be applied conditionally
 *
 * @param {string | RegExp} matcher
 * @param {string | ((m: string[]) => string)} selector selector to nest
 * @param {string} [name] variant name
 * @param {import('../types').RuleHandler} [other] additional processor
 */
export function defineVariant(matcher, selector, name, other) {
	const sel = isString(selector) ? () => selector : selector
	const oth = isFunction(other) ? other : () => other

	return defineRule(
		isString(matcher) ? `${matcher}:` : matcher,
		defineHandler((m, o) => {
			return partObj({
				...o,
				...oth?.(m, o),
				// nest in selector
				[symbols.nest]: [...(o?.[symbols.nest] ?? []), sel(m)],
				// consume token
				[symbols.token]: o?.[symbols.token]?.slice(m[0].length),
			})
		}),
		{
			name: name ?? (isString(matcher) ? matcher : matcher.source),
		},
	)
}
