import { defineVariant } from './define.js'
import { restoreSpaces as rs } from './handlers.js'

import pseudo from './variant/pseudo.js'
import responsive from './variant/responsive.js'

/**
 * @param {string} query
 * @param {string} value
 */
const media = (query, value) => `@media (${query}: ${value})`

const ariaStates = [
	'busy',
	'checked',
	'disabled',
	'expanded',
	'hidden',
	'pressed',
	'readonly',
	'required',
	'selected',
]

/**
 * @param {import('../types').OikazeOptions['theme']} [theme]
 */
export default function* (theme) {
	yield* pseudo()

	// https://tailwindcss.com/docs/hover-focus-and-other-states#aria-states
	for (const state of ariaStates) {
		yield defineVariant(`aria-${state}`, `&[aria-${state}="true"]`, 'attr-aria')
	}

	yield defineVariant(/^aria-\[(.+)\]:/, (m) => `&[aria-${m[1]}]`, 'attr-aria')

	// https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes
	yield defineVariant(/^data-\[(.+)\]:/, (m) => `&[data-${m[1]}]`, 'attr-data')

	yield* responsive(theme)

	// https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-color-scheme
	for (const val of ['dark', 'light']) {
		yield defineVariant(val, media('prefers-color-scheme', val))
	}

	// https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-reduced-motion
	const motion = {
		'motion-safe': 'no-preference',
		'motion-reduce': 'reduce',
	}
	for (const [name, val] of Object.entries(motion)) {
		yield defineVariant(name, media('prefers-reduced-motion', val))
	}

	// https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-contrast
	for (const val of ['more', 'less']) {
		yield defineVariant(`contrast-${val}`, media('prefers-contrast', val))
	}

	// https://tailwindcss.com/docs/hover-focus-and-other-states#forced-colors
	yield defineVariant('forced-colors', media('forced-colors', 'active'))

	// https://tailwindcss.com/docs/hover-focus-and-other-states#inverted-colors
	yield defineVariant('inverted-colors', media('inverted-colors', 'inverted'))

	// https://tailwindcss.com/docs/hover-focus-and-other-states#pointer-and-any-pointer
	for (const pointer of ['fine', 'coarse', 'none']) {
		for (const q of ['pointer', 'any-pointer']) {
			yield defineVariant(`${q}-${pointer}`, media(q, pointer))
		}
	}

	// https://tailwindcss.com/docs/hover-focus-and-other-states#orientation
	for (const val of ['portrait', 'landscape']) {
		yield defineVariant(val, media('orientation', val))
	}

	// https://tailwindcss.com/docs/hover-focus-and-other-states#scripting
	yield defineVariant('noscript', media('scripting', 'none'))

	// https://tailwindcss.com/docs/hover-focus-and-other-states#print
	yield defineVariant('print', '@media print')

	// https://tailwindcss.com/docs/hover-focus-and-other-states#supports
	yield defineVariant(
		/^(not-)?supports-\[([^\]]+)\]:/,
		(m) => `@supports ${m[1] ? 'not ' : ''}(${rs(m[2])})`,
		'@supports'
	)

	// https://tailwindcss.com/docs/adding-custom-styles#arbitrary-variants
	yield defineVariant(/^\[([^\]]+)\]:/, (s) => rs(s[1]), 'arbitrary-variants')
}
