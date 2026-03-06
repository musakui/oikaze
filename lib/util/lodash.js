/**
 * @param {unknown} val
 * @returns {val is Function}
 */
export function isFunction(val) {
	return !!val && typeof val === 'function'
}

/**
 * @param {unknown} val
 * @returns {val is string}
 */
export function isString(val) {
	return typeof val === 'string'
}

/**
 * @param {unknown} val
 * @returns {val is Record<string, unknown>}
 */
export function isObject(val) {
	return !!val && typeof val === 'object'
}

/**
 * @param {string | string[]} [s]
 */
export function joinIfArray(s, glue = ', ') {
	if (!s) return undefined
	return Array.isArray(s) ? s.join(glue) : s
}

/**
 * @template T
 * @template U
 * @param {Record<string, T>} o
 * @param {(key: string, val: T) => [string, U]} t
 */
export function mapObject(o, t) {
	return Object.fromEntries(Object.entries(o).map((v) => t(v[0], v[1])))
}

/**
 * @param {...string} keys
 */
export function fromKeys(...keys) {
	return Object.fromEntries(keys.map((k) => [k, k]))
}

/**
 * @template T
 * @param {(s: string, i: number) => T} fn
 * @param {...string} keys
 */
export function fromKeysFn(fn, ...keys) {
	return Object.fromEntries(keys.map((k, i) => [k, fn(k, i)]))
}

/**
 * @param {string} unit
 * @param {Record<string, number>} obj
 */
export function mapUnit(unit, obj) {
	return mapObject(obj, (k, v) => [k, `${v}${unit}`])
}

/**
 * @param {string[]} a
 * @param {string[]} [b]
 */
export function cartesian(a, b) {
	return a.flatMap((y) => (b ?? a).map((x) => `${y}-${x}`))
}

/**
 * @param {string[]} a
 * @param {string[]} b
 */
export function cartesianStack(a, b) {
	return a.map((y) => b.map((x) => `${y}-${x}`))
}

/**
 * @param {() => void} fn
 */
export function debounced(fn, timeout = 100) {
	/** @type {ReturnType<typeof setTimeout> | null} */
	let timer = null

	return () => {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			fn()
			timer = null
		}, timeout)
	}
}
