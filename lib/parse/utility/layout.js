import { _var } from '../../util/css.js'
import { defineUtility, defineStaticUtility } from '../define.js'
import { h, getSideName } from '../handlers.js'

export default function* () {
	// https://tailwindcss.com/docs/aspect-ratio
	yield defineUtility(
		'aspect',
		'aspect-ratio',
		h.lookup({
			square: '1 / 1',
			// @ts-expect-error
			video: _var('--aspect-video', '16 / 9'),
		}).ratio.cssvar.raw._,
	)

	// https://tailwindcss.com/docs/columns
	yield defineUtility('columns', null, h.auto.number.container.cssvar.raw._)

	// https://tailwindcss.com/docs/break-after
	yield defineUtility('break-after')

	// https://tailwindcss.com/docs/break-before
	yield defineUtility('break-before')

	// https://tailwindcss.com/docs/break-inside
	yield defineUtility('break-inside')

	// https://tailwindcss.com/docs/box-decoration-break
	yield defineUtility('box-decoration')

	// https://tailwindcss.com/docs/box-sizing
	for (const b of ['border', 'content']) {
		yield defineStaticUtility(`box-${b}`, 'box-sizing', `${b}-box`)
	}

	// https://tailwindcss.com/docs/display
	const display = [
		'inline',
		'block',
		'inline-block',
		'flow-root',
		'flex',
		'inline-flex',
		'grid',
		'inline-grid',
		'contents',
		'table',
		'inline-table',
		'table-caption',
		'table-cell',
		'table-column',
		'table-column-group',
		'table-footer-group',
		'table-header-group',
		'table-row-group',
		'table-row',
		'list-item',
	]
	for (const name of display) {
		yield defineStaticUtility(name, 'display')
	}
	yield defineStaticUtility('hidden', { display: 'none' })
	yield defineStaticUtility('sr-only', {
		position: 'absolute',
		padding: 0,
		width: '1px',
		height: '1px',
		margin: '-1px',
		overflow: 'hidden',
		'clip-path': 'inset(50%)',
		'white-space': 'nowrap',
		'border-width': 0,
	})
	yield defineStaticUtility('not-sr-only', {
		position: 'static',
		width: 'auto',
		height: 'auto',
		padding: 0,
		margin: 0,
		overflow: 'visible',
		'clip-path': 'none',
		'white-space': 'normal',
	})

	const parseWrapping = h.lookup({ start: 'inline-start', end: 'inline-end' })._

	// https://tailwindcss.com/docs/float
	yield defineUtility('float', null, parseWrapping)

	// https://tailwindcss.com/docs/clear
	yield defineUtility('clear', null, parseWrapping)

	// https://tailwindcss.com/docs/isolation
	yield defineStaticUtility('isolate', { isolation: 'isolate' })
	yield defineStaticUtility('isolation-auto', { isolation: 'auto' })

	yield defineUtility('object', {
		cases: [
			// https://tailwindcss.com/docs/object-fit
			['object-fit', h.contain.cover.fill.none['scale-down']],

			// https://tailwindcss.com/docs/object-position
			['object-position', h.cssvar.raw.split],
		],
	})

	for (const dir of ['', '-x', '-y']) {
		// https://tailwindcss.com/docs/overflow
		yield defineUtility(`overflow${dir}`)
		// https://tailwindcss.com/docs/overscroll-behavior
		yield defineUtility(`overscroll${dir}`, 'overscroll-behavior')
	}

	// https://tailwindcss.com/docs/position
	const position = ['static', 'fixed', 'absolute', 'relative', 'sticky']
	for (const name of position) {
		yield defineStaticUtility(name, 'position')
	}

	// https://tailwindcss.com/docs/top-right-bottom-left
	yield defineUtility('inset', {
		matcher: /^(-)?inset(?:-([xyse]|b[se]))?-(.+)$/,
		parser: h.auto.fractionAsPercent.spacing.px.cssvar.raw._,
		prop: (m) => getSideName('inset', m[2]),
		context: (m) => [m[3], { n: m[1] }],
	})

	yield defineUtility('inset-side', {
		matcher: /^(-)?(top|right|bottom|left)-(.+)$/,
		parser: h.auto.fractionAsPercent.spacing.px.cssvar.raw._,
		prop: (m) => m[2],
		context: (m) => [m[3], { n: m[1] }],
	})

	// https://tailwindcss.com/docs/visibility
	for (const name of ['visible', 'collapse']) {
		yield defineStaticUtility(name, 'visibility')
	}
	yield defineStaticUtility('invisible', { visibility: 'hidden' })

	// https://tailwindcss.com/docs/z-index
	yield defineUtility('z', 'z-index', h.auto.number.cssvar.raw._)

	// https://tailwindcss.com/docs/table-layout
	yield defineStaticUtility('table-auto', 'table-layout', 'auto')
	yield defineStaticUtility('table-fixed', 'table-layout', 'fixed')

	// https://tailwindcss.com/docs/caption-side
	yield defineStaticUtility('caption-top', 'caption-side', 'top')
	yield defineStaticUtility('caption-bottom', 'caption-side', 'bottom')

	// https://tailwindcss.com/docs/flex-basis
	yield defineUtility(
		'basis',
		'flex-basis',
		h.auto.spacing.container.fractionAsPercent.cssvar.raw._,
	)

	yield defineUtility('flex', {
		cases: [
			// https://tailwindcss.com/docs/flex-direction
			[
				'flex-direction',
				h
					.exact('row', 'row-reverse')
					.lookup({ col: 'column', 'col-reverse': 'column-reverse' }),
			],

			// https://tailwindcss.com/docs/flex-wrap
			['flex-wrap', h.wrap.nowrap['wrap-reverse']],

			// https://tailwindcss.com/docs/flex
			[
				'flex',
				// prettier-ignore
				h.auto.none.lookup({ initial: '0 auto' })
					.number.fractionAsPercent.cssvar.raw._,
			],
		],
	})

	// https://tailwindcss.com/docs/flex-grow
	defineStaticUtility('grow', 'flex-grow', 1)
	defineUtility('grow', 'flex-grow', h.number.cssvar.raw._)

	// https://tailwindcss.com/docs/flex-shrink
	defineStaticUtility('shrink', 'flex-shrink', 1)
	defineUtility('shrink', 'flex-shrink', h.number.cssvar.raw._)

	// https://tailwindcss.com/docs/order
	yield defineUtility('order', {
		negatable: true,
		parser: h.lookup({
			none: '0',
			last: '9999',
			first: '-9999',
		}).number.cssvar.raw._,
	})

	const parseTemplate = h.numberTo('repeat(\0, minmax(0, 1fr))').cssvar.raw._

	// https://tailwindcss.com/docs/grid-template-columns
	yield defineUtility('grid-cols', 'grid-template-columns', parseTemplate)

	// https://tailwindcss.com/docs/grid-template-rows
	yield defineUtility('grid-rows', 'grid-template-rows', parseTemplate)

	// https://tailwindcss.com/docs/grid-column
	// https://tailwindcss.com/docs/grid-row
	const parseGrid = h.auto.number.cssvar.raw._
	yield defineUtility('grid-span', {
		matcher: /^(-)?(col|row)(?:-(span|start|end))?-(.+)$/,
		handler: ([_, n, d, p, v]) => {
			const prop = `grid-${d === 'row' ? d : 'column'}`
			const g = parseGrid(v, { n })
			if (p !== 'span') return { [`${prop}${p ? `-${p}` : ''}`]: g }
			return { [prop]: g === 'full' ? '1 / -1' : `span ${g}/ span ${g}` }
		},
	})

	// https://tailwindcss.com/docs/grid-auto-flow
	yield defineUtility('grid-flow', 'grid-auto-flow', h.split)

	const parseGridAuto = h.content.lookup({ fr: 'minmax(0, 1fr)' }).cssvar.raw._

	// https://tailwindcss.com/docs/grid-auto-columns
	yield defineUtility('auto-cols', 'grid-auto-columns', parseGridAuto)

	// https://tailwindcss.com/docs/grid-auto-rows
	yield defineUtility('auto-rows', 'grid-auto-rows', parseGridAuto)

	// gap - see below

	const placementBase = {
		around: 'space-around',
		evenly: 'space-evenly',
		between: 'space-between',
		'center-safe': 'safe center',
		'end-safe': 'safe flex-end',
		'baseline-last': 'last baseline',
	}

	const parsePlacement = h.lookup(placementBase)._
	const parsePlacmementFlex = h.lookup({
		...placementBase,
		start: 'flex-start',
		end: 'flex-end',
	})._

	// https://tailwindcss.com/docs/justify-content
	// https://tailwindcss.com/docs/justify-items
	// https://tailwindcss.com/docs/justify-self
	yield defineUtility('justify', {
		matcher: /^justify(?:-(items|self))?-(.+)$/,
		handler: ([_, t, s]) => {
			return t === 'items' || t === 'self'
				? { [`justify-${t}`]: parsePlacement(s) }
				: { 'justify-content': parsePlacmementFlex(s) }
		},
	})

	yield defineUtility('content', {
		cases: [
			// https://tailwindcss.com/docs/content (shadowed)
			['content', h.none.cssvar.raw],

			// https://tailwindcss.com/docs/align-content
			['align-content', parsePlacmementFlex],
		],
	})

	// https://tailwindcss.com/docs/align-items
	yield defineUtility('items', 'align-items', parsePlacmementFlex)

	// https://tailwindcss.com/docs/align-self
	yield defineUtility('self', 'align-self', parsePlacmementFlex)

	// https://tailwindcss.com/docs/place-content
	yield defineUtility('place-content', null, parsePlacement)

	// https://tailwindcss.com/docs/place-items
	yield defineUtility('place-items', null, parsePlacement)

	// https://tailwindcss.com/docs/place-self
	yield defineUtility('place-self', null, parsePlacement)

	// https://tailwindcss.com/docs/gap
	yield defineUtility('gap', {
		matcher: /^gap(?:-([xy]))?-(.+)$/,
		context: (m) => [m[2]],
		parser: h.spacing.px.cssvar.raw._,
		prop: ([_, d]) => `${d ? (d === 'y' ? 'row-' : 'column-') : ''}gap`,
	})

	// https://tailwindcss.com/docs/padding
	yield defineUtility('padding', {
		matcher: /^p([xyrltbse]|b[se])?-(.+)$/,
		context: (m) => [m[2]],
		parser: h.spacing.px.cssvar.raw._,
		prop: (m) => getSideName('padding', m[1]),
	})

	// https://tailwindcss.com/docs/margin
	yield defineUtility('margin', {
		matcher: /^(-)?m([xyrltbse]|b[se])?-(.+)$/,
		context: (m) => [m[3], { n: m[1] }],
		parser: h.spacing.px.cssvar.raw._,
		prop: (m) => getSideName('margin', m[2]),
	})

	/** @type {Record<string, string>} */
	const wh = { w: 'width', h: 'height' }

	const parseSize = h.auto.content.screen.lookup({
		lh: '1lh',
		svw: '100svw',
		svh: '100svh',
		lvw: '100lvw',
		lvh: '100lvh',
		dvw: '100dvw',
		dvh: '100dvh',
	}).container.spacing.px.fractionAsPercent.cssvar.raw._

	// https://tailwindcss.com/docs/width
	// https://tailwindcss.com/docs/height
	yield defineUtility('size', {
		matcher: /^(size|w|h)-(.+)$/,
		handler: ([_, d, v]) => {
			if (d === 'size') {
				const s = parseSize(v)
				return { width: s, height: s }
			}
			return { [wh[d]]: parseSize(v, { d }) }
		},
	})

	// https://tailwindcss.com/docs/min-width
	// https://tailwindcss.com/docs/max-width
	// https://tailwindcss.com/docs/min-height
	// https://tailwindcss.com/docs/max-height
	yield defineUtility('size-limit', {
		matcher: /^(min|max)-(w|h)-(.+)$/,
		handler: ([_, e, d, v]) => ({
			[`${e}-${wh[d]}`]: parseSize(v, { d }),
		}),
	})

	// https://tailwindcss.com/docs/inline-size
	// https://tailwindcss.com/docs/min-inline-size
	// https://tailwindcss.com/docs/max-inline-size
	// https://tailwindcss.com/docs/block-size
	// https://tailwindcss.com/docs/min-block-size
	// https://tailwindcss.com/docs/max-block-size
	yield defineUtility('size-new', {
		matcher: /^((?:min|max)-)?(inline|block)-(.+)$/,
		handler: ([_, e, d, v]) => ({
			[`${e}${d}-size`]: parseSize(v, { d }),
		}),
	})
}
