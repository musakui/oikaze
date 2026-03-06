import { isFunction } from './util/lodash.js'
import { createOiContext } from './plugin/context.js'
import { tagNamesExtractor } from './plugin/extractTagNames.js'
import { classNamesExtractor } from './plugin/extractClassNames.js'

/** @param {import('./types').OikazeOptions} opts */
export default function (opts) {
	const ctx = createOiContext(opts)

	const extractors = [
		...(opts?.extract?.disableDefault
			? []
			: [
					tagNamesExtractor(opts), // extract from tag names
					classNamesExtractor(opts), // extract from class names
				]),
		...(opts?.extract?.plugins ?? []),
	]

	return /** @type {import('vite').PluginOption} */ ([
		{
			name: 'oikaze:main',
			configureServer(s) {
				ctx.servers.push(s)
			},
			configResolved(resolvedConfig) {
				ctx.config = resolvedConfig
			},
			buildStart() {
				ctx.cache.clear()
				ctx.collector.init()
				if (ctx.config.command === 'build') ctx.wait()
			},
			hotUpdate() {
				ctx.collector.init()
			},
			resolveId: {
				filter: ctx.moduleFilter,
				handler(id) {
					return id
				},
			},
			load: {
				filter: ctx.moduleFilter,
				async handler() {
					return await ctx.generateOutput()
				},
			},
		},
		...extractors.map((p) => isFunction(p) ? p(ctx) : p),
	])
}
