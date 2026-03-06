import { isObject, fromKeysFn, mapUnit } from '../../util/lodash.js'
import { _var } from '../../util/css.js'
import { h, parseColor } from '../handlers.js'
import { defineStaticUtility, defineUtility } from '../define.js'
import { defaultLineHeights, defaultTextSizeRem } from '../defaults.js'

export default function* () {
	// https://tailwindcss.com/docs/font-smoothing
	yield defineStaticUtility('antialiased', {
		'-webkit-font-smoothing': 'antialiased',
		'-moz-osx-font-smoothing': 'grayscale',
	})
	yield defineStaticUtility('subpixel-antialiased', {
		'-webkit-font-smoothing': 'auto',
		'-moz-osx-font-smoothing': 'auto',
	})

	// https://tailwindcss.com/docs/font-style
	yield defineStaticUtility('italic', 'font-style', 'italic')
	yield defineStaticUtility('not-italic', 'font-style', 'normal')

	// https://tailwindcss.com/docs/font-stretch
	yield defineUtility('font-stretch', null, h.percent.cssvar.raw._)

	// https://tailwindcss.com/docs/font-variant-numeric
	const numericVariants = [
		'ordinal',
		'slashed-zero',
		'lining-nums',
		'oldstyle-nums',
		'proportional-nums',
		'tabular-nums',
		'diagonal-fractions',
		'stacked-fractions',
	]
	yield defineStaticUtility('normal-nums', 'font-variant-numeric', 'normal')
	for (const v of numericVariants) {
		yield defineStaticUtility(v, 'font-variant-numeric', v)
	}

	// https://tailwindcss.com/docs/font-feature-settings
	yield defineUtility('font-features', 'font-feature-settings', h.cssvar.raw._)

	// https://tailwindcss.com/docs/letter-spacing
	yield defineUtility(
		'tracking',
		'letter-spacing',
		h.cssvar.raw.asVar('tracking', {
			tighter: '-0.05em',
			tight: '-0.025em',
			normal: '0em',
			wide: '0.025em',
			wider: '0.05em',
			widest: '0.1em',
		}),
	)

	// https://tailwindcss.com/docs/line-clamp
	const parseClamp = h.number.cssvar.raw
	yield defineUtility('line-clamp', {
		handler: ([_, v]) => {
			return v === 'none'
				? {
						overflow: 'visible',
						display: 'block',
						'-webkit-box-orient': 'horizontal',
						'-webkit-line-clamp': 'unset',
					}
				: {
						overflow: 'hidden',
						display: '-webkit-box',
						'-webkit-box-orient': 'vertical',
						'-webkit-line-clamp': parseClamp(v),
					}
		},
	})

	// https://tailwindcss.com/docs/line-height
	yield defineUtility(
		'leading',
		'line-height',
		h.lookup({ none: '1' }).spacing.cssvar.raw._,
	)

	// https://tailwindcss.com/docs/list-style-image
	yield defineUtility(
		'list-image',
		'list-style-image',
		h.none.cssvar.rawPreserve._,
	)

	yield defineUtility('list', {
		cases: [
			// https://tailwindcss.com/docs/list-style-position
			['list-style-position', h.inside.outside],

			// https://tailwindcss.com/docs/list-style-type
			['list-style-type', h.cssvar.raw._],
		],
	})

	// https://tailwindcss.com/docs/text-decoration-line
	for (const d of ['underline', 'overline', 'line-through']) {
		yield defineStaticUtility(d, 'text-decoration-line')
	}
	yield defineStaticUtility('no-underline', { 'text-decoration-line': 'none' })

	// https://tailwindcss.com/docs/text-underline-offset
	yield defineUtility('underline-offset', {
		negatable: true,
		prop: 'text-underline-offset',
		parser: h.px.cssvar.raw._,
	})

	// https://tailwindcss.com/docs/text-transform
	for (const c of ['uppercase', 'lowercase', 'capitalize']) {
		yield defineStaticUtility(c, 'text-transform')
	}
	yield defineStaticUtility('normal-case', { 'text-transform': 'none' })

	// https://tailwindcss.com/docs/text-overflow
	yield defineStaticUtility('truncate', {
		overflow: 'hidden',
		'white-space': 'nowrap',
		'text-overflow': 'ellipsis',
	})

	// https://tailwindcss.com/docs/text-indent
	yield defineUtility('indent', {
		negatable: true,
		prop: 'text-indent',
		parser: h.spacing.px.cssvar.raw._,
	})

	// https://tailwindcss.com/docs/vertical-align
	yield defineUtility('align', 'vertical-align', h.cssvar.raw._)

	// https://tailwindcss.com/docs/white-space
	yield defineUtility('whitespace', 'white-space')

	// https://tailwindcss.com/docs/word-break
	yield defineUtility(
		'break',
		'word-break',
		h.lookup({ all: 'break-all', keep: 'keep-all' })._,
	)

	// https://tailwindcss.com/docs/overflow-wrap
	yield defineUtility('wrap', 'overflow-wrap')

	// https://tailwindcss.com/docs/hyphens
	yield defineUtility('hyphens')

	// https://tailwindcss.com/docs/content - see layout.js

	// https://tailwindcss.com/docs/font-family
	const fontFamilies = fromKeysFn(
		(k) => `var(--font-${k})`,
		'sans',
		'serif',
		'mono',
	)

	// https://tailwindcss.com/docs/font-weight
	const weights = fromKeysFn(
		(_, i) => `${(i + 1) * 100}`,
		'thin',
		'extralight',
		'light',
		'normal',
		'medium',
		'semibold',
		'bold',
		'extrabold',
		'black',
	)

	yield defineUtility('font', {
		cases: [
			['font-family', h.lookup(fontFamilies).cssvarOf({ type: 'family-name' })],
			['font-weight', h.lookup(weights).cssvar.raw._],
		],
	})

	const parseLineHeight = h.spacing.cssvar.raw

	yield defineUtility('text', {
		modifiable: true,
		cases: [
			// https://tailwindcss.com/docs/text-overflow
			['text-overflow', h.clip.ellipsis],

			// https://tailwindcss.com/docs/text-align
			['text-align', h.left.center.right.justify.start.end],

			// https://tailwindcss.com/docs/text-wrap
			['text-wrap', h.wrap.nowrap.balance.pretty],

			// https://tailwindcss.com/docs/font-size
			[
				'font-size',
				h // @ts-expect-error
					.lookup({ base: _var('--text-base', '1rem') })
					.tshirtVar('text', mapUnit('rem', defaultTextSizeRem))
					.cssvarOf({ type: 'length' }),
				([_, v, a], o) => {
					const height =
						parseLineHeight(a) ??
						(isObject(o?.['font-size'])
							? _var(`--text-${v}--line-height`, defaultLineHeights[v])
							: undefined)
					return {
						...o,
						...(height ? { 'line-height': height } : null),
					}
				},
			],

			// https://tailwindcss.com/docs/color
			['color', parseColor],
		],
	})

	yield defineUtility('decoration', {
		modifiable: true,
		cases: [
			// https://tailwindcss.com/docs/text-decoration-style
			['text-decoration-style', h.solid.double.dotted.dashed.wavy],
			// https://tailwindcss.com/docs/text-decoration-thickness
			['thickness', h.auto['from-font'].px.cssvarOf({ type: 'length' })],
			// https://tailwindcss.com/docs/text-decoration-color
			['text-decoration-color', parseColor],
		],
	})

	// https://tailwindcss.com/docs/stroke (svg)
	yield defineUtility('stroke', {
		modifiable: true,
		cases: [
			['stroke-width', h.number.cssvarOf({ type: 'length' }).raw],
			['stroke', parseColor],
		],
	})
}
