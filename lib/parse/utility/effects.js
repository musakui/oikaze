import { mapObject, mapUnit } from '../../util/lodash.js'
import { _var, _vs, symbols } from '../../util/css.js'
import { h, parseColor } from '../handlers.js'
import { defineStaticUtility, defineUtility } from '../define.js'
import { defaultBlurPx } from '../defaults.js'

const shadowVars = [
	_var('--oi-ins-s', { initial: '0 0 #0000' }),
	_var('--oi-ins-ring-s', { initial: '0 0 #0000' }),
	_var('--oi-ring-s', { initial: '0 0 #0000' }),
	_var('--oi-ring-o-s', { initial: '0 0 #0000' }),
	_var('--oi-shd', { initial: '0 0 #0000' }),
]

const misc = [
	_var('--oi-ring-ins', {}),
	_var('--oi-ring-off-w', { syntax: '<length>', initial: '0px' }),
	_var('--oi-ring-off-c', { initial: '#fff' }),
	_var('--oi-ring-off-s', { initial: '0 0 #0000' }),
]

export default function* () {
	/** @param {string} s */
	const box = (s, a = 0.1) => `${s} var(--oi-shd-c, rgb(0 0 0 / ${a}))`

	// https://tailwindcss.com/docs/box-shadow
	const parseBoxShadow = h.lookup({
		none: '0 0 #0000',
		'2xs': box('0 1px', 0.05),
		xs: box(`0 1px 2px 0`, 0.05),
		sm: [box(`0 1px 3px 0`), box(`0 1px 2px -1px`)].join(','),
		md: [box(`0 4px 6px -1px`), box(`0 2px 4px -2px`)].join(','),
		lg: [box(`0 10px 15px -3px`), box(`0 4px 6px -4px`)].join(','),
		xl: [box(`0 20px 25px -5px`), box(`0 8px 10px -6px`)].join(','),
		'2xl': box(`0 25px 50px -12px`, 0.25),
	}).cssvar.raw

	yield defineUtility('shadow', {
		modifiable: true,
		cases: [
			[
				'--oi-shd',
				parseBoxShadow,
				(_, o) => ({
					...o,
					'box-shadow': shadowVars.join(', '),
					[symbols.additional]: [...shadowVars, _var('--oi-shd-c', {})],
				}),
			],
			['--oi-shd-c', parseColor],
		],
	})

	/** @param {string} s */
	const inset = (s) => `inset ${s} var(--oi-ins-shd-c, rgb(0 0 0 / 0.05))`

	const parseInsetShadow = h.lookup({
		none: 'inset 0 0 #0000',
		'2xs': inset('0 1px'),
		xs: inset('0 1px 1px'),
		sm: inset('0 2px 4px'),
	}).cssvar

	yield defineUtility('inset-shadow', {
		modifiable: true,
		cases: [
			[
				'--oi-ins-s',
				parseInsetShadow,
				(_, o) => ({
					...o,
					'box-shadow': shadowVars.join(', '),
					[symbols.additional]: [...shadowVars, _var('--oi-ins-c', {})],
				}),
			],
			['--oi-ins-c', parseColor],
		],
	})

	yield defineUtility('ring', {
		modifiable: true,
		cases: [
			['--oi-ring-s', h.px.cssvar.raw],
			['--oi-ring-c', parseColor],
		],
	})

	yield defineUtility('inset-ring', {
		modifiable: true,
		cases: [
			['--oi-ins-ring-s', h.px.cssvar.raw],
			['--oi-ins-ring-c', parseColor],
		],
	})

	/** @param {string} s */
	const txt = (s, a = 0.1) => `var(--oi-txt-shd-c, rgb(0 0 0 / ${a})) ${s}`

	// https://tailwindcss.com/docs/text-shadow
	const parseTextShadow = h.none.tshirtVar('text-shadow', {
		'2xs': txt(`0px 1px 0px`, 0.15),
		xs: txt(`0px 1px 1px`, 0.2),
		sm: [
			txt(`0px 1px 0px`, 0.075),
			txt(`0px 1px 1px`, 0.075),
			txt(`0px 2px 2px`, 0.075),
		].join(','),
		md: [txt(`0px 1px 1px`), txt(`0px 1px 2px`), txt(`0px 2px 4px`)].join(','),
		lg: [txt(`0px 1px 2px`), txt(`0px 3px 2px`), txt(`0px 4px 8px`)].join(','),
	}).cssvar
	yield defineUtility('text-shadow', {
		modifiable: true,
		cases: [
			[
				'text-shadow',
				parseTextShadow,
				(_, o) => ({
					...o,
					[symbols.additional]: [_var('--oi-txt-shd-c', {})],
				}),
			],
			['--oi-txt-shd-c', parseColor],
		],
	})

	// https://tailwindcss.com/docs/opacity
	yield defineUtility('opacity', null, h.percent.cssvar.raw._)

	// https://tailwindcss.com/docs/mix-blend-mode
	yield defineUtility('mix-blend', 'mix-blend-mode')

	// https://tailwindcss.com/docs/background-blend-mode
	yield defineUtility('bg-blend', 'background-blend-mode')

	// https://tailwindcss.com/docs/mask-clip
	yield defineUtility('mask-clip', null, h.box)
	yield defineStaticUtility('mask-no-clip', { 'mask-clip': 'no-clip' })

	// https://tailwindcss.com/docs/mask-origin
	yield defineUtility('mask-origin', null, h.box)

	// https://tailwindcss.com/docs/mask-position
	yield defineUtility('mask-position', null, h.cssvar.raw._)

	// https://tailwindcss.com/docs/mask-repeat
	yield defineUtility('mask-repeat')
	yield defineStaticUtility('mask-no-repeat', { 'mask-repeat': 'no-repeat' })

	// https://tailwindcss.com/docs/mask-size
	yield defineUtility('mask-size', null, h.cssvar.raw)

	// https://tailwindcss.com/docs/mask-type
	yield defineUtility('mask-type')

	yield defineUtility('mask', {
		cases: [
			// https://tailwindcss.com/docs/mask-composite
			['mask-composite', h.add.subtract.intersect.exclude],

			// https://tailwindcss.com/docs/mask-mode
			['mask-mode', h.alpha.luminance.lookup({ match: 'match-source' })],

			// https://tailwindcss.com/docs/mask-size
			['mask-size', h.auto.cover.contain],

			// https://tailwindcss.com/docs/mask-image
			['mask-image', h.none.cssvar.rawPreserve],

			// https://tailwindcss.com/docs/mask-position
			['mask-position', h.replace(/-/g, ' ')],
		],
	})

	// https://tailwindcss.com/docs/filter
	yield defineUtility('filter', null, h.none.cssvar.raw)

	// https://tailwindcss.com/docs/blur
	const parseBlur = h
		.lookup({ none: '' })
		.tshirtVar('blur', mapUnit('px', defaultBlurPx)).cssvar.raw
	yield defineFilter('blur', parseBlur)

	// h.percent.cssvar.raw

	// https://tailwindcss.com/docs/brightness
	yield defineFilter('brightness', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/contrast
	yield defineFilter('contrast', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/grayscale
	yield defineStaticUtility('grayscale', {
		'--oi-grayscale': 'grayscale(100%)',
	})
	yield defineFilter('grayscale', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/invert
	yield defineStaticUtility('invert', {
		'--oi-invert': 'invert(100%)',
	})
	yield defineFilter('invert', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/saturate
	yield defineFilter('saturate', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/sepia
	yield defineStaticUtility('sepia', {
		'--oi-sepia': 'sepia(100%)',
	})
	yield defineFilter('sepia', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/hue-rotate
	yield defineFilter('hue-rotate', h.numberTo('\0deg').cssvar.raw, true)

	// https://tailwindcss.com/docs/drop-shadow
	const drpShdCol = (a = 0.15) => `var(--oi-drp-shd-c, rgb(0 0 0 / ${a}))`

	const parseDropShadow = h
		.lookup({ none: '0 0 #0000' })
		.tshirtVar('drop-shadow', {
			xs: `0 1px 1px ${drpShdCol(0.05)}`,
			sm: `0 1px 2px ${drpShdCol()}`,
			md: `0 3px 3px ${drpShdCol(0.12)}`,
			lg: `0 4px 4px ${drpShdCol()}`,
			xl: `0 9px 7px ${drpShdCol(0.1)}`,
			'2xl': `0 25px 25px ${drpShdCol()}`,
		}).cssvar.raw

	// https://tailwindcss.com/docs/backdrop-filter
	yield defineUtility('backdrop-filter', null, h.none.cssvar.raw)

	// https://tailwindcss.com/docs/backdrop-blur
	yield defineFilter('backdrop-blur', parseBlur)

	// https://tailwindcss.com/docs/backdrop-brightness
	yield defineFilter('backdrop-brightness', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/backdrop-contrast
	yield defineFilter('backdrop-contrast', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/backdrop-grayscale
	yield defineStaticUtility('backdrop-grayscale', {
		'--oi-backdrop-grayscale': 'grayscale(100%)',
	})
	yield defineFilter('backdrop-grayscale', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/backdrop-invert
	yield defineStaticUtility('backdrop-invert', {
		'--oi-backdrop-invert': 'invert(100%)',
	})
	yield defineFilter('backdrop-invert', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/backdrop-saturate
	yield defineFilter('backdrop-saturate', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/backdrop-sepia
	yield defineStaticUtility('backdrop-sepia', {
		'--oi-backdrop-sepia': 'sepia(100%)',
	})
	yield defineFilter('backdrop-sepia', h.percent.cssvar.raw)

	// https://tailwindcss.com/docs/backdrop-hue-rotate
	yield defineFilter(
		'backdrop-hue-rotate',
		h.numberTo('\0deg').cssvar.raw,
		true,
	)
}

/**
 * @param {string} name
 * @param {import('../types').Parser} parser
 */
function defineFilter(name, parser, negatable = false) {
	const fn = name.startsWith('backdrop-') ? name.slice(9) : name
	return defineUtility(name, {
		negatable,
		handler: (m) => {
			const val = negatable ? parser(m[2], { n: m[1] }) : parser(m[1])
			return { [`--oi-${name}`]: val ? `${fn}(${val})` : '' }
		},
	})
}
