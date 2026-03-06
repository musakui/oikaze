import { symbols } from '../../util/css.js'
import { defineVariant } from '../define.js'
import { defaultContainerRem, defaultBreakpointRem } from '../defaults.js'

/** @typedef {import('../../types').ShirtSize} ShirtSize */

const rem = 'rem'

// https://tailwindcss.com/docs/responsive-design
/**
 * @param {object} [opts]
 * @param {string} [opts.unit] CSS unit
 * @param {Record<ShirtSize, number | null>} [opts.breakpoints]
 * @param {Record<ShirtSize, number | null>} [opts.containers]
 */
export default function* (opts) {
	const unit = opts?.unit ?? rem

	const config = {
		breakpoint: {
			...(unit === rem ? defaultBreakpointRem : null),
			...opts?.breakpoints,
		},
		container: {
			...(unit === rem ? defaultContainerRem : null),
			...opts?.containers,
		},
	}

	for (const [t, values] of Object.entries(config)) {
		const [p, q] = t === 'container' ? ['@', t] : ['', 'media']
		for (const [size, width] of Object.entries(values)) {
			if (!width) continue
			const w = `${width}${unit}`
			yield defineVariant(`${p}${size}`, `@${q} (width >= ${w})`, t, {
				[symbols.sort]: `${t}-min-${width}`,
			})
			yield defineVariant(`${p}max-${size}`, `@${q} (width < ${w})`, t, {
				[symbols.sort]: `${t}-max-${width}`,
			})
		}
	}

	yield defineVariant(
		/^(@)?(min|max)-\[(.+)\]:/,
		([_, a, m, v]) => {
			const s = m === 'min' ? '>=' : '<'
			return `@${a ? 'container' : 'media'} (width ${s} ${v})`
		},
		'media-mw-custom'
	)
}
