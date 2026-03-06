import { mapUnit, cartesian, cartesianStack } from '../../util/lodash.js'
import { h, sides, getSideName, parseColor } from '../handlers.js'
import { defineStaticUtility, defineUtility } from '../define.js'
import { defaultRadiiRem } from '../defaults.js'
import { _vs, _var, symbols } from '../../util/css.js'

export default function* () {
	const tb = ['top', 'bottom']
	const lr = ['left', 'right']

	const [t, b] = cartesianStack(tb, lr)
	const [l, r] = cartesianStack(lr, tb)

	const tblr = cartesian(tb, lr)
	const [tl, tr, bl, br] = tblr.map((v) => [v])

	const sted = cartesian(['start', 'end'])
	const [ss, se, es, ee] = sted.map((s) => [s])

	/** @type {Record<string, string[]>} */
	const corners = {
		t,
		r,
		b,
		l,
		tl,
		tr,
		bl,
		br,
		ss,
		se,
		es,
		ee,
		s: [...ss, ...es],
		e: [...se, ...ee],
	}

	// https://tailwindcss.com/docs/background-clip
	yield defineUtility('bg-clip', 'background-clip', h.text.box)

	// https://tailwindcss.com/docs/background-origin
	yield defineUtility('bg-origin', 'background-origin', h.box)

	// https://tailwindcss.com/docs/background-position
	yield defineUtility('bg-position', 'background-position', h.cssvar.raw._)

	// https://tailwindcss.com/docs/background-repeat
	yield defineUtility('bg-repeat', 'background-repeat')

	// https://tailwindcss.com/docs/background-size
	yield defineUtility('bg-size', 'background-size', h.cssvar.raw._)

	yield defineUtility('bg', {
		modifiable: true,
		cases: [
			// https://tailwindcss.com/docs/background-repeat
			['background-repeat', h.repeat['no-repeat']],
			// https://tailwindcss.com/docs/background-attachment
			['background-attachment', h.fixed.local.scroll],
			// https://tailwindcss.com/docs/background-size
			['background-size', h.auto.cover.contain],
			// https://tailwindcss.com/docs/background-position
			['background-position', h.center.exact(...tb, ...lr, ...tblr)],
			// https://tailwindcss.com/docs/background-image
			['background-image', h.none.cssvarOf({ type: 'image' }).rawPreserve],
			// https://tailwindcss.com/docs/background-color
			['background-color', parseColor],
		],
	})

	// https://tailwindcss.com/docs/fill (svg)
	yield defineUtility('fill', {
		modifiable: true,
		parser: parseColor,
	})

	// https://tailwindcss.com/docs/border-radius
	const parseRadius = h
		.lookup({ none: '0', full: 'calc(infinity * 1px)' })
		.tshirtVar('radius', mapUnit('rem', defaultRadiiRem)).cssvar.raw

	yield defineUtility('rounded', {
		matcher: /^rounded(?:-([setrbl]|[se][se]|[tb][lr]))?-(.+)?$/,
		handler: ([_, c, v]) => {
			const rd = parseRadius(v)
			const pp = corners[c]
			if (!pp) return { 'border-radius': rd }
			return Object.fromEntries(pp.map((s) => [`border-${s}-radius`, rd]))
		},
	})

	const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'none']

	// https://tailwindcss.com/docs/border-style
	yield defineStaticUtility('border-hidden', 'border-style', 'hidden')
	for (const style of borderStyles) {
		yield defineStaticUtility(`border-${style}`, 'border-style', style)
	}

	// https://tailwindcss.com/docs/border-collapse (tables)
	yield defineStaticUtility(`border-collapse`, 'border-collapse', 'collapse')
	yield defineStaticUtility(`border-seperate`, 'border-collapse', 'seperate')

	// https://tailwindcss.com/docs/border-spacing (tables)
	const parseSpacing = h.spacing.px.cssvar.raw
	const borderSpacingVars = ['x', 'y'].map((v) => {
		return _var(`--oi-bd-sp-${v}`, {
			syntax: '<length>',
			initial: '0',
		})
	})
	yield defineUtility('border-spacing', {
		matcher: /^border-spacing(?:-([xy]))?-(.+)/,
		handler: ([_, d, v]) => {
			const spacing = parseSpacing(v)
			if (!d) return { 'border-spacing': spacing }
			return {
				[`--oi-border-spacing-${d}`]: spacing,
				[symbols.additional]: borderSpacingVars,
				'border-spacing': `var('--oi-bd-sp-x') var(--oi-bd-sp-y)`,
			}
		},
	})

	// https://tailwindcss.com/docs/border-width
	yield defineStaticUtility('border', 'border-width', '1px')

	// https://tailwindcss.com/docs/border-color
	const parseWidth = h.px.cssvarOf({ type: 'length' }).raw
	yield defineUtility('border', {
		matcher: /^border(?:-([xysetrbl]|b[se]))?-(.+?)(?:\/(.+))?$/,
		handler: ([_, s, v, a]) => {
			const side = getSideName('border', s)
			const w = parseWidth(v)
			if (w) return { [`${side}-width`]: w }

			const vs = sides[v]
			if (vs) return { [`border-${vs}-width`]: '1px' }

			return {
				[`${side}-color`]: parseColor(v, { a }),
			}
		},
	})

	// https://tailwindcss.com/docs/outline-style
	yield defineStaticUtility('outline-hidden', {
		'outline-offset': '2px',
		outline: '2px solid transparent',
	})
	for (const style of borderStyles) {
		yield defineStaticUtility(`outline-${style}`, 'outline-style', style)
	}

	// https://tailwindcss.com/docs/outline-offset
	yield defineUtility('outline-offset', {
		negatable: true,
		parser: h.px.cssvar.raw._,
	})

	// https://tailwindcss.com/docs/outline-width
	yield defineStaticUtility('outline', 'outline-width', '1px')

	yield defineUtility('outline', {
		modifiable: true,
		cases: [
			// https://tailwindcss.com/docs/outline-width
			['outline-width', h.px.cssvarOf({ type: 'length' }).raw],

			// https://tailwindcss.com/docs/outline-color
			['outline-color', parseColor],
		],
	})
}
