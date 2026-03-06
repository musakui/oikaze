import { symbols, _var } from '../../util/css.js'
import { defineUtility } from '../define.js'
import { h } from '../handlers.js'

export default function* () {
	const axes = [...'xyz']
	const init = { initial: '0' }

	const rotateXYZ = axes.map((d) => _var(`--oi-r${d}`, init))
	const skewXY = axes.map((d) => _var(`--oi-k${d}`, init))
	const scaleXYZ = axes.map((d) => _var(`--oi-s${d}`, init))
	const translateXYZ = axes.map((d) => _var(`--oi-t${d}`, init))

	const transform = [...rotateXYZ, ...skewXY].join(' ')

	// https://tailwindcss.com/docs/perspective-origin
	yield defineUtility('perspective-origin', null, h.cssvar.raw.split)

	// https://tailwindcss.com/docs/perspective
	yield defineUtility(
		'perspective',
		null,
		h.none.cssvar.raw.asVar('perspective', {
			dramatic: '100px',
			near: '300px',
			normal: '500px',
			midrange: '800px',
			distant: '1200px',
		}),
	)

	// https://tailwindcss.com/docs/rotate
	const parseRotation = h.none.numberTo('\0deg').cssvar.raw
	yield defineUtility('rotate', {
		matcher: /^(-)?rotate(?:-([xyz]))?-(.+)$/,
		handler: ([_, n, a, v]) => {
			const rotate = parseRotation(v, { n })
			if (!a) return { rotate }
			return {
				[`--oi-r${a}`]: `rotate${a.toUpperCase()}(${rotate})`,
				[symbols.additional]: rotateXYZ,
				transform,
			}
		},
	})

	// https://tailwindcss.com/docs/scale
	const parseScale = h.none.percent.cssvar.raw
	yield defineUtility('scale', {
		matcher: /^(-)?scale(?:-([xy]))?-(.+)$/,
		handler: ([_, n, d, v]) => {
			const scale = parseScale(v, { n })
			if (!d) return { scale }
			const axes = d === 'z' ? scaleXYZ : scaleXYZ.slice(0, 2)
			return {
				[`--oi-s${d}`]: scale,
				[symbols.additional]: axes,
				scale: axes.join(' '),
			}
		},
	})

	// https://tailwindcss.com/docs/skew
	yield defineUtility('skew', {
		matcher: /^(-)?skew(?:-([xy]))?-(.+)$/,
		handler: ([_, n, d, v]) => {
			const skew = parseRotation(v, { n })
			if (!d) return { transform: `skew(${skew})` }
			return {
				[`--oi-k${d}`]: `skew${d.toUpperCase()}(${skew})`,
				[symbols.additional]: skewXY,
				transform,
			}
		},
	})

	yield defineUtility('transform', {
		cases: [
			// https://tailwindcss.com/docs/transform-style
			['transform-style', h.flat.lookup({ '3d': 'preserve-3d' })],

			// https://tailwindcss.com/docs/transform
			[
				'transform',
				h.none.lookup({
					cpu: transform,
					gpu: `translateZ(0) ${transform}`,
				}).cssvar.raw,
			],
		],
	})

	// https://tailwindcss.com/docs/transform-origin
	yield defineUtility('origin', 'transform-origin', h.cssvar.raw.split)

	// https://tailwindcss.com/docs/translate
	const parseTranslate = h.none.fractionAsPercent.spacing.px.cssvar.raw
	yield defineUtility('translate', {
		matcher: /^(-)?translate(?:-([xyz]))?-(.+)$/,
		handler: ([_, n, d, v]) => {
			const translate = parseTranslate(v, { n })
			if (!d) return { translate }
			const axes = d === 'z' ? translateXYZ : translateXYZ.slice(0, 2)
			return {
				[`--oi-t${d}`]: translate,
				[symbols.additional]: axes,
				translate: axes.join(' '),
			}
		},
	})
}
