import { isString } from './lodash.js'

/**
 * @template {string[]} T
 * @typedef {import('../types').RuleHandler<T>} RuleHandler
 */

/**
 * @template {string[]} T
 * @typedef {import('../types').Handler<T>} Handler
 */

/** @typedef {import('../types').RuleMeta} RuleMeta */
/** @typedef {import('../types').CSSObject} CSSObject */

/**
 * @template {RuleHandler<string[]>} T
 * @param {string | RegExp} matcher
 * @param {T} handler
 * @param {RuleMeta} [meta]
 */
export function defineRule(matcher, handler, meta) {
	return isString(matcher)
		? defineStaticRule(matcher, handler, meta)
		: defineDynamicRule(matcher, handler, meta)
}

/**
 * @template {RuleHandler<string[]>} T
 * @param {string} matcher
 * @param {T} handler
 * @param {RuleMeta} [meta]
 */
export function defineStaticRule(matcher, handler, meta) {
	return /** @type {import('../types').StaticRule<T>} */ ({
		type: 'static',
		matcher,
		handler,
		name: matcher, // use matcher as the default name
		...meta,
	})
}

/**
 * @template {RuleHandler<RegExpMatchArray>} T
 * @param {RegExp} matcher
 * @param {T} handler
 * @param {RuleMeta} [meta]
 */
export function defineDynamicRule(matcher, handler, meta) {
	return /** @type {import('../types').DynamicRule<T>} */ ({
		type: 'dynamic',
		matcher,
		handler,
		...meta,
	})
}

/**
 * @template {string[]} T
 * @param {Handler<T>} handler
 */
export function defineHandler(handler) {
	return handler
}
