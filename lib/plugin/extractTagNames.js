import { isFunction, isString } from '../util/lodash.js'
import * as symbols from '../util/symbol.js'
import tagRules from '../parse/tags.js'

const name = 'oikaze:tag-names-extractor'
const defaultExtractorRegex = /<([a-z]+|h[123456])\s+[^>]*>/g

/** @typedef {import('../types').CSSObject} CSSObject */

/**
 * @param {import('../types').OikazeOptions} opts
 */
export function tagNamesExtractor(opts) {
	const regex = opts?.extract?.tagRegex ?? defaultExtractorRegex
	const rules = opts?.extract?.tags ?? [...tagRules()]

	/**
	 * @param {string} tag
	 * @param {string} src
	 */
	function* getMatches(tag, src) {
		for (const rule of rules) {
			if (
				(rule.type === 'static' && rule.matcher === tag) ||
				(rule.type === 'dynamic' && rule.matcher.test(src))
			) {
				yield rule.handler
			}
		}
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
			},
			transform: {
				filter: { code: regex },
				handler(code, id) {
					ctx.collector.bump()

					let updated = false

					/** @type {Set<string>} */
					const current = new Set()
					const previous = output.get(id)

					for (const [src, tag] of code.matchAll(regex)) {
						for (const out of getMatches(tag, src)) {
							const t = out[symbols.token]
							if (current.has(t)) continue
							current.add(t)
							if (previous && !previous.has(t)) {
								updated = true
							}
							if (ctx.cache.has(t)) continue
							ctx.cache.set(t, out)
						}
					}

					output.set(id, current)
					if (updated) ctx.invalidate()
				},
			},
		})
	}
}
