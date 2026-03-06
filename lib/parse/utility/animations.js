import { _var, cssObj, symbols } from '../../util/css.js'
import { defineStaticUtility, defineUtility } from '../define.js'
import { h } from '../handlers.js'

const timings = {
	in: `cubic-bezier(0.4, 0, 1, 1)`,
	out: `cubic-bezier(0, 0, 0.2, 1)`,
	'in-out': `cubic-bezier(0.4, 0, 0.2, 1)`,
}

/** @type {Record<string, string>} */
const animationKeyframes = {
	spin: `to { transform: rotate(360deg) }`,
	ping: `75%, 100% { transform: scale(2); opacity: 0 }`,
	pulse: `50% { opacity: 0.5 }`,
	bounce: `
	0%, 100% {
		transform: translateY(-25%);
		animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
	}
	50% { transform: none; animation-timing-function: ${timings.out} }`,
}

const defaultTransition = {
	'transition-duration': _var('--default-transition-duration', '150ms'),
	// prettier-ignore
	'transition-timing-function': _var('--default-transition-timing-function', timings.out),
}

const transitionProps = {
	transform: 'transform, translate, scale, rotate',
	colors:
		'color, background-color, border-color, outline-color, text-decoration-color, fill, stroke',
	shadow: 'box-shadow',
}

export default function* () {
	// https://tailwindcss.com/docs/transition-property
	yield defineStaticUtility('transition-none', 'transition-property', 'none')
	yield defineStaticUtility('transition', {
		...defaultTransition,
		'transition-property': [
			transitionProps.colors,
			'opacity',
			'box-shadow',
			transitionProps.transform,
			'filter, backdrop-filter, display, content-visibility, overlay, pointer-events',
		].join(', '),
	})

	// https://tailwindcss.com/docs/transition-behavior
	yield defineStaticUtility(
		'transition-normal',
		'transition-behavior',
		'normal',
	)
	yield defineStaticUtility(
		'transition-discrete',
		'transition-behavior',
		'allow-discrete',
	)

	const parseTransition = h.all.opacity.lookup(transitionProps).cssvar.raw._
	yield defineUtility('transition', {
		handler: ([_, v]) => ({
			...defaultTransition,
			'transition-property': parseTransition(v),
		}),
	})

	// https://tailwindcss.com/docs/transition-duration
	yield defineUtility(
		'duration',
		'transition-duration',
		h.numberTo('\0ms').cssvar.raw._,
	)

	// https://tailwindcss.com/docs/transition-timing-function
	yield defineUtility(
		'ease',
		'transition-timing-function',
		h.linear.initial.cssvar.raw.asVar('ease', timings),
	)

	// https://tailwindcss.com/docs/transition-delay
	yield defineUtility(
		'delay',
		'transition-delay',
		h.numberTo('\0ms').cssvar.raw._,
	)

	// https://tailwindcss.com/docs/animation
	const parseAnimation = h.none.cssvar.raw.asVar('animate', {
		spin: 'spin 1s linear infinite',
		ping: `ping 1s ${timings.out} infinite`,
		pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
		bounce: 'bounce 1s infinite',
	})

	yield defineUtility('animate', {
		handler: ([_, v]) => {
			const animation = parseAnimation(v)
			const kf = animationKeyframes[v]
			return {
				animation,
				...(kf
					? {
							[symbols.additional]: [
								cssObj({
									[symbols.token]: `keyframes-${v}`,
									[symbols.selector]: `@keyframes ${v}`,
									[symbols.body]: kf,
								}),
							],
						}
					: null),
			}
		},
	})
}
