import { defineStaticUtility, defineUtility } from './define.js'
import { restoreSpaces } from './handlers.js'

import layout from './utility/layout.js'
import typography from './utility/typography.js'
import borders from './utility/borders.js'
import effects from './utility/effects.js'
import animations from './utility/animations.js'
import transforms from './utility/transforms.js'
import interactivity from './utility/interactivity.js'

export default [
	// https://tailwindcss.com/docs/responsive-design#container-queries
	defineStaticUtility('@container', { 'container-type': 'inline-size' }),

	...layout(),
	...typography(),
	...borders(),
	...effects(),
	...animations(),
	...transforms(),
	...interactivity(),

	// https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties
	defineUtility('arbitrary-properties', {
		matcher: /^\[([^:]+):([^\]]+)\]$/,
		handler: (m) => ({ [m[1]]: restoreSpaces(m[2]) }),
	}),
]
