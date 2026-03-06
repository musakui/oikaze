import type { CSSObject, CSSVar, Handler } from '../types'

import { basic, withParam } from './handlers'

export type CSSValue = string | CSSVar | undefined

export type RuleContext = Record<string, unknown>

export type InitContext = (
	match: string[],
	obj?: Partial<CSSObject>,
) => [value: string, context?: RuleContext]

export type BaseParser<T extends CSSValue = CSSValue> = (
	value: string,
	context?: RuleContext,
) => T

export type UtilityOptions = {
	/** property to set */
	prop?: string | ((match: string[]) => string)

	/** can this utility be negated? (e.g. `-m-1`) */
	negatable?: boolean

	/** can this utility be modified? (e.g. `text-red-50/40`) */
	modifiable?: boolean

	/** make a context for the parser */
	context?: InitContext

	/** cases to flow through */
	cases?: [prop: string, parser: BaseParser, extra?: Handler][]

	/** parser for the value received */
	parser?: BaseParser<CSSVar | string>

	/** custom matcher */
	matcher?: RegExp

	/** custom handler */
	handler?: Handler
}

type Basic<T, Parsers> = {
	readonly [P in keyof Parsers]: Parser<NonNullable<T> | ReturnType<Parsers[P]>>
}

type WithParams<T, Parsers> = {
	readonly [P in keyof Parsers]: (
		...args: Parameters<Parsers[P]>
	) => Parser<NonNullable<T> | ReturnType<ReturnType<Parsers[P]>>>
}

type AllParsers<T> = WithParams<T, typeof withParam> & Basic<T, typeof basic>

export interface Parser<T = CSSValue> extends AllParsers<T> {
	(value: string, context?: RuleContext): T

	/** exact match for `prop` */
	readonly [prop: string]: Parser<NonNullable<T> | string | undefined>
}
