import { fromKeys } from '../../util/lodash.js'
import { defineVariant } from '../define.js'

const misc = {
	'*': ':is(& > *)',
	'**': ':is(& *)',
	starting: '@starting-style',
}

const pseudoClasses = {
	...fromKeys(
		'hover',
		'focus',
		'focus-within',
		'focus-visible',
		'active',
		'visited',
		'target'
	),

	first: 'first-child',
	last: 'last-child',
	odd: 'nth-child(odd)',
	even: 'nth-child(even)',

	...fromKeys('first-of-type', 'last-of-type', 'only-of-type'),

	...fromKeys(
		'empty',
		'disabled',
		'enabled',
		'checked',
		'indeterminate',
		'default',
		'optional',
		'required',
		'valid',
		'invalid',
		'user-valid',
		'user-invalid',
		'in-range',
		'out-of-range',
		'placeholder-shown',
		'details-content',
		'autofill',
		'read-only'
	),

	// https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support
	rtl: 'where(:dir(rtl), [dir="rtl"], [dir="rtl"] *)',
	ltr: 'where(:dir(ltr), [dir="ltr"], [dir="ltr"] *)',

	// https://tailwindcss.com/docs/hover-focus-and-other-states#openclosed-state
	open: 'is([open], :popover-open, :open)',

	// https://tailwindcss.com/docs/hover-focus-and-other-states#styling-inert-elements
	inert: 'is([inert], [inert] *)',
}

const pseudoElements = {
	...fromKeys(
		'before',
		'after',
		'first-letter',
		'first-line',
		'selection',
		'backdrop',
		'placeholder'
	),

	// https://tailwindcss.com/docs/hover-focus-and-other-states#marker
	marker: 'maker, & *::marker', // eh

	// https://tailwindcss.com/docs/hover-focus-and-other-states#file
	file: 'file-selector-button',
}

/** @satisfies {Record<string, (s: string) => string>} */
const prefixes = {
	has: (s) => `&:has(*:${s})`,
	group: (s) => `&:is(:where(.group):${s} *)`,
	peer: (s) => `&:is(:where(.peer):${s} ~ *)`,
	in: (s) => `:where(*:${s}) &`,
	not: (s) => `&:not(*:${s})`,
}

export default function* () {
	for (const [pc, sel] of Object.entries(pseudoClasses)) {
		yield defineVariant(pc, `&:${sel}`)

		for (const [k, v] of Object.entries(prefixes)) {
			yield defineVariant(`${k}-${pc}`, v(sel))
		}
	}

	for (const [pe, sel] of Object.entries(pseudoElements)) {
		yield defineVariant(pe, `&::${sel}`)
	}

	for (const [name, sel] of Object.entries(misc)) {
		yield defineVariant(name, sel)
	}

	// https://tailwindcss.com/docs/hover-focus-and-other-states#nth-child
	yield defineVariant(
		/^(nth(?:-(?:last|of-type|last-of-type))?)-\[([^\]]+)\]:/,
		([_, n, v]) => `&:${n.endsWith('-type') ? n : `${n}-child`}(${v})`,
		'nth-child'
	)
}
