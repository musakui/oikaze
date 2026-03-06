import { isString } from '../util/lodash.js'
import { defineRule } from '../util/rule.js'
import { cssObj, symbols } from '../util/css.js'

export default function* () {
	yield defineBase('hr', {
		height: 0, // add the correct height in Firefox
		color: 'inherit', // correct the inheritance of border color in Firefox
		'border-top-width': '1px', // reset the default border style to a 1px solid border
	})

	// add the correct text decoration in Chrome, Edge, and Safari
	yield defineBase('abbr', {
		[symbols.selector]: 'abbr:where([title])',
		'text-decoration': 'underline dotted',
	})

	// remove the default font size and weight for headings
	for (const n of '123456') {
		yield defineBase(`h${n}`, inherit('font-size', 'font-weight'))
	}

	// reset links to optimize for opt-in styling instead of opt-out
	yield defineBase('a', inherit('color', 'text-decoration'))

	// monospaced elements
	for (const el of ['pre', 'kbd', 'samp', 'code']) {
		yield defineBase(
			`mono-${el}`,
			{
				'font-size': '1em', // correct `em` font sizing
				'font-family': 'var(--font-mono)',
			},
			el
		)
	}

	// add the correct font size in all browsers
	yield defineBase('small', { 'font-size': '80%' })

	// prevent `sub` and `sup` from affecting the line height
	yield defineBase('sup', { top: '-0.5em' })
	yield defineBase('sub', { bottom: '-0.25em' })
	for (const s of ['sub', 'sup']) {
		yield defineBase(
			`${s}script`,
			{
				position: 'relative',
				'line-height': 0,
				'font-size': '75%',
				'vertical-align': 'baseline',
			},
			s
		)
	}

	yield defineBase('table', {
		'text-indent': 0, // remove text indentation from table contents in Chrome and Safari
		'border-color': 'inherit', // correct table border color inheritance in Chrome and Safari
		'border-collapse': 'collapse', // remove gaps between table borders by default
	})

	// add the correct vertical alignment in Chrome and Firefox
	yield defineBase('progress', { 'vertical-align': 'baseline' })

	// add the correct display in Chrome and Safari
	yield defineBase('summary', { display: 'list-item' })

	// make lists unstyled by default
	for (const el of ['ol', 'ul', 'menu']) {
		yield defineBase(`unstyled-${el}`, { 'list-style': 'none' }, el)
	}

	const imgvideo = ['img', 'video']
	const replaced = [...imgvideo, 'canvas', 'audio', 'iframe', 'embed', 'object']

	for (const el of replaced) {
		yield defineBase(
			`ext-${el}`,
			{
				display: 'block', // make replaced elements `block` by default
				'vertical-align': 'middle',
			},
			el
		)
	}

	// constrain images and videos to the parent width and preserve their intrinsic aspect ratio
	for (const el of imgvideo) {
		yield defineBase(
			`ext-${el}-iv`,
			{ height: 'auto', 'max-width': '100%' },
			el
		)
	}

	const inputFileRE = /^<input.+?type="file"/s
	const fileSelectorButton = '::file-selector-button'
	const formEls = ['button', 'input', 'select', 'optgroup', 'textarea']

	for (const el of [...formEls, fileSelectorButton]) {
		yield defineBase(
			`forms-${el}`,
			{
				[symbols.selector]: el,
				opacity: 1, // ensure consistent opacity for disabled states
				'border-radius': 0, // remove border radius
				'background-color': 'transparent', // remove background color
				...inherit(
					'font', // inherit font styles
					'color',
					'letter-spacing',
					'font-feature-settings',
					'font-variation-settings'
				),
			},
			el === fileSelectorButton ? inputFileRE : el
		)
	}

	// restore default font weight and indentation
	yield defineBase(
		'forms-select-multiple',
		{
			[symbols.selector]: ':where(select:is([multiple], [size])) optgroup',
			[symbols.body]: `font-weight: bolder; & option { padding-inline-start: 20px }`,
		},
		'optgroup'
	)

	yield defineBase(
		`forms-${fileSelectorButton}-main`,
		{
			[symbols.selector]: fileSelectorButton,
			margin: 0,
			padding: 0,
			border: '0 solid',
			'box-sizing': 'border-box',
			'margin-inline-end': '4px', // restore space after button
		},
		inputFileRE
	)

	// prevent resizing textareas horizontally by default
	yield defineBase('forms-textarea-v', { resize: 'vertical' }, 'textarea')
}

/** @param {...string} keys */
function inherit(...keys) {
	return Object.fromEntries(keys.map((k) => [k, 'inherit']))
}

/**
 * @param {string} name rule name. also used as the token for sorting
 * @param {Partial<ReturnType<typeof cssObj>>} obj
 * @param {string | RegExp} [matcher]
 */
function defineBase(name, obj, matcher) {
	const out = cssObj({
		[symbols.token]: name,
		[symbols.layer]: 'base',
		// fallback to matcher or name as selector
		[symbols.selector]:
			obj[symbols.selector] ?? (isString(matcher) ? matcher : name),
		...obj,
	})

	// use name as matcher if not provided
	return defineRule(matcher ?? name, out, { name })
}
