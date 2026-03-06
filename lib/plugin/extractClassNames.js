import { isFunction } from '../util/lodash.js'
import { cssObj, partObj, symbols } from '../util/css.js'

import allVariants from '../parse/variants.js'
import allUtilities from '../parse/utilities.js'

const name = 'oikaze:class-names-extractor'
const defaultExtractorRegex = /(?<=class=")[^"]+(?=")/g

/**
 * @param {import('../types').OikazeOptions} opts
 */
export function classNamesExtractor(opts) {
	const regex = opts?.extract?.classRegex ?? defaultExtractorRegex
	const variants = opts?.extract?.variants ?? [...allVariants(opts.theme)]
	const utilities = opts?.extract?.utilities ?? allUtilities

	/** @type {Map<string, number>} */
	const tokenSrcs = new Map()

	/** @param {string} token */
	function processToken(token) {
		const original = token

		let variant = false
		let obj = partObj({ [symbols.token]: token })

		while (token) {
			const vh = getHandler(token, variants)
			if (!vh) break
			const [h, m] = vh
			obj = isFunction(h) ? h(m, obj) : { ...obj, ...h }
			token = obj[symbols.token] || ''
			variant = true
		}

		if (!token) return null
		const uh = getHandler(token, utilities)
		if (!uh) {
			// debug token
			return cssObj({
				[symbols.token]: original,
				[symbols.layer]: 'components',
				[symbols.body]: `/* ${original} */`,
			})
		}
		const [h, m] = uh
		return cssObj({
			...obj,
			...(isFunction(h) ? h(m, obj) : h),
			[symbols.layer]: variant ? 'variants' : 'utilities',
			[symbols.token]: original, // reset token
		})
	}

	/** @param {import('./context').OiContext} ctx */
	return (ctx) => {
		/** @type {Map<string, Set<string>>} */
		const output = new Map()
		ctx.output.set(name, output)

		return /** @type {import('vite').Plugin} */ ({
			name,
			buildStart() {
				output.clear()
				tokenSrcs.clear()
			},
			transform: {
				filter: { code: regex },
				handler(code, id) {
					ctx.collector.bump()

					let updated = false

					/** @type {Set<string>} */
					const current = new Set()
					const previous = output.get(id)

					for (const [match] of code.matchAll(regex)) {
						for (const t of match.split(' ')) {
							if (current.has(t)) continue
							current.add(t)
							if (previous && !previous.has(t)) {
								updated = true
							}
							if (ctx.cache.has(t)) continue
							ctx.cache.set(t, processToken(t))
						}
						tokenSrcs.set(match, (tokenSrcs.get(match) ?? 0) + 1)
					}

					output.set(id, current)
					if (updated) ctx.invalidate()
				},
			},
		})
	}
}

/**
 * @param {string} str
 * @param {import('../types').Rule[]} rules
 */
function getHandler(str, rules) {
	for (const rule of rules) {
		if (rule.type === 'static') {
			const m = rule.matcher
			const h = rule.handler
			if (m === str) {
				return /** @type {[typeof h, string[]]} */ ([h, [str, str]])
			}
			const mln = m.length
			const lst = m[mln - 1]
			if ((lst === '-' || lst === ':') && str.startsWith(m)) {
				return /** @type {[typeof h, string[]]} */ ([h, [m, str.slice(mln)]])
			}
		} else if (rule.type === 'dynamic') {
			const m = rule.matcher.exec(str)
			if (m) return /** @type {const} */ ([rule.handler, m])
		}
	}
	return null
}
