// from `@rolldown/pluginutils`
const escapeRegexRE = /[-/\\^$*+?.()|[\]{}]/g

/**
 * @param {string} str
 * @param {string} [flags]
 */
export function exactRegex(str, flags) {
	return new RegExp(`^${escapeRegex(str)}$`, flags)
}

/**
 * @param {string} str
 * @param {string} [flags]
 */
export function prefixRegex(str, flags) {
	return new RegExp(`^${escapeRegex(str)}`, flags)
}

/** @param {string} str */
export function escapeRegex(str) {
	return str.replace(escapeRegexRE, '\\$&')
}
