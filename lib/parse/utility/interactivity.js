import { defineStaticUtility, defineUtility } from '../define.js'
import { h, parseColor, getSideName } from '../handlers.js'

export default function* () {
	// https://tailwindcss.com/docs/accent-color
	yield defineUtility('accent', {
		prop: 'accent-color',
		modifiable: true,
		parser: parseColor,
	})

	// https://tailwindcss.com/docs/appearance
	yield defineUtility('appearance')

	// https://tailwindcss.com/docs/caret-color
	yield defineUtility('caret', {
		prop: 'caret-color',
		modifiable: true,
		parser: parseColor,
	})

	// https://tailwindcss.com/docs/color-scheme
	yield defineUtility('scheme', 'color-scheme', h.split)

	// https://tailwindcss.com/docs/cursor
	yield defineUtility('cursor', null, h.cssvar.raw._)

	// https://tailwindcss.com/docs/field-sizing
	yield defineUtility('field-sizing')

	// https://tailwindcss.com/docs/pointer-events
	yield defineUtility('pointer-events')

	// https://tailwindcss.com/docs/resize
	yield defineStaticUtility('resize', { resize: 'both' })
	yield defineUtility(
		'resize',
		null,
		h.lookup({ y: 'vertical', x: 'horizontal' })._,
	)

	// https://tailwindcss.com/docs/scroll-behavior
	for (const b of ['auto', 'smooth']) {
		yield defineStaticUtility(`scroll-${b}`, 'scroll-behavior', b)
	}

	// https://tailwindcss.com/docs/scroll-margin
	yield defineUtility('scroll-margin', {
		matcher: /^(-)?scroll-m(?:([xysetrbl]|b[se]))?-(.+)$/,
		context: (m) => [m[3], { n: m[1] }],
		parser: h.spacing.px.cssvar.raw._,
		prop: (m) => getSideName('scroll-margin', m[2]),
	})

	// https://tailwindcss.com/docs/scroll-padding
	yield defineUtility('scroll-padding', {
		matcher: /^scroll-p(?:([xysetrbl]|b[se]))?-(.+)$/,
		context: (m) => [m[2]],
		parser: h.spacing.px.cssvar.raw._,
		prop: (m) => getSideName('scroll-padding', m[1]),
	})

	yield defineUtility('snap', {
		cases: [
			// https://tailwindcss.com/docs/scroll-snap-stop
			['scroll-snap-stop', h.normal.always],

			// https://tailwindcss.com/docs/scroll-snap-align
			[
				'scroll-snap-align',
				h.start.end.center.lookup({ 'align-none': 'none' }),
			],

			// https://tailwindcss.com/docs/scroll-snap-type
			['--oi-snap-strict', h.mandatory.proximity],
			['scroll-snap-type', h.none.rewrite('\0 var(--oi-snap-strict)')],
		],
	})

	// https://tailwindcss.com/docs/touch-action
	yield defineUtility('touch', 'touch-action')

	// https://tailwindcss.com/docs/user-select
	yield defineUtility('select', 'user-select')

	// https://tailwindcss.com/docs/will-change
	yield defineUtility(
		'will-change',
		null,
		h.lookup({ scroll: 'scroll-position' }).cssvar.raw._,
	)
}
