import type { Plugin } from 'vite'
import { symbols } from './util/css'
import type { OiContext } from './util/context'

export type ShirtSize =
	| `${number}xs`
	| 'xs'
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| `${number}xl`

export type OikazeOptions = {
	/** entry point for module */
	entry?: string

	/** theme config */
	theme?: {
		/** unit for containers and breakpoints */
		unit?: 'rem' | 'px'

		/** container sizes */
		containers?: Record<ShirtSize, number | null>

		/** breakpoint sizes */
		breakpoints?: Record<ShirtSize, number | null>
	}

	/** extraction options */
	extract?: {
		tags?: Rule<CSSObject>[]

		variants?: Rule<Handler>[]

		utilities?: Rule[]

		tagRegex?: RegExp

		classRegex?: RegExp

		disableDefault?: boolean

		plugins?: (Plugin | ((ctx: OiContext) => Plugin))[]
	}
}

/**
 * an object that represents a CSS declaration
 *
 * external parts can be manipulated via certain symbol properties
 */
export type CSSObject = {
	[prop: string]: string | number | CSSObject

	/** source token */
	[symbols.token]: string

	/** key to use for sorting */
	[symbols.sort]?: string

	/** nested CSS selectors (from outer to inner) */
	[symbols.nest]?: string[]

	/** CSS body */
	[symbols.body]?: string

	/** CSS layer */
	[symbols.layer]?: string

	/** CSS selector */
	[symbols.selector]?: string | string[]

	/** additional CSS statements */
	[symbols.additional]?: CSSObject[]
}

export interface CSSVar extends CSSObject {
	[Symbol.toPrimitive]: () => string
}

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property}
 */
export type CustomPropertyOpts = {
	/** allowed value types (default: `*`) */
	syntax?: string

	/** initial value for the property */
	initial?: string

	/** does the property inherit by default? (default: false) */
	inherits?: boolean
}

export type RuleMeta = {
	/** rule name */
	name?: string

	/** sort order key */
	order?: string

	[x: string]: unknown
}

export type Handler<T extends string[] = string[]> = (
	match: T,
	obj?: Partial<CSSObject>,
) => Partial<CSSObject>

export type RuleHandler<M extends string[] = string[]> =
	| Partial<CSSObject>
	| Handler<M>

export interface StaticRule<H extends RuleHandler> extends RuleMeta {
	type: 'static'
	matcher: string
	handler: H
}

export interface DynamicRule<
	H extends RuleHandler<RegExpMatchArray>,
> extends RuleMeta {
	type: 'dynamic'
	matcher: RegExp
	handler: H
}

export type Rule<T extends RuleHandler = RuleHandler> =
	| StaticRule<T>
	| DynamicRule<T>
