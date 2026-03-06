import { compare } from './compare.js'
import { isObject, isString } from './lodash.js'
import { cssObj, render, symbols } from './css.js'

/** @typedef {import('../types').CSSObject} CSSObject */

const NO_LAYER = '~'

const layerOrder = [
	'theme',
	'base',
	'components',
	'utilities',
	'variants',
]

/**
 * @param {Iterable<CSSObject>} objs
 */
export function stylesheet(objs) {
	/** @type {Map<string, CSSObject>} */
	const additional = new Map()

	const themeRoot = cssObj({
		[symbols.token]: 'theme-root',
		[symbols.layer]: 'theme',
		[symbols.selector]: ':root',
	})

	/** @type {Map<string, CSSObject[]>} */
	const layers = new Map(layerOrder.map((n) => [n, []]))

	/** @type {CSSObject[]} */
	const noLayer = []

	for (const o of objs) {
		for (const a of o[symbols.additional] ?? []) {
			additional.set(a[symbols.token], a)
		}
		Object.assign(themeRoot, Object.fromEntries(getVars(o)))
		;(layers.get(o[symbols.layer] ?? NO_LAYER) ?? noLayer).push(o)
	}

	if (Object.keys(themeRoot).length) {
		layers.get('theme')?.unshift(themeRoot)
	}

	noLayer.push(...additional.values())

	return [
		`@layer ${layerOrder.join(',')};`,
		`@import "@musakui/oikaze/preflight/theme.css" layer(theme);`,
		`@import "@musakui/oikaze/preflight/global.css" layer(base);`,
		...layerOrder.map((name) => {
			const items = layers.get(name) ?? []
			if (!items.length) return ''
			return `@layer ${name} {\n${items.sort(compareObjs).map(render).join('\n')}\n}`
		}),
		...noLayer.map(render),
	].join('\n')
}

/**
 * @param {CSSObject} a
 * @param {CSSObject} b
 */
export function compareObjs(a, b) {
	const custom =
		compare(a[symbols.sort], b[symbols.sort]) ||
		(a[symbols.nest]?.length || 0) - (b[symbols.nest]?.length || 0) ||
		compare(a[symbols.token], b[symbols.token])

	if (custom) return custom

	const aSel = a[symbols.selector]
	const bSel = b[symbols.selector]
	if (isString(aSel) && isString(bSel)) {
		const sc = compare(aSel, bSel)
		if (sc) return sc
	}

	return 0
}

/**
 * @param {CSSObject} obj
 */
function* getVars(obj) {
	for (const val of Object.values(obj)) {
		if (!isObject(val)) continue
		yield* Object.entries(val)
	}
}
