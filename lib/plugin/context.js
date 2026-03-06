import { exactRegex } from '../util/regex.js'
import { debounced } from '../util/lodash.js'
import { stylesheet } from '../util/generate.js'

/** @typedef {ReturnType<typeof createOiContext>} OiContext */
/** @typedef {import('../types').CSSObject} CSSObject */

const defaultModuleId = ':oikaze.css'

/** @param {import('../types').OikazeOptions} opts */
export function createOiContext(opts) {
	/** @type {PromiseWithResolvers<void> | null} */
	let mainResolver = null

	const moduleId = opts?.entry ?? defaultModuleId

	/** @type {import('vite').ViteDevServer[]} */
	const servers = []

	/** @type {Map<string, CSSObject | null>} */
	const cache = new Map()

	/** @type {Map<string, Map<string, Set<string>>>} */
	const output = new Map()

	const collector = defaultCollector()

	const invalidate = debounced(() => {
		for (const s of servers) {
			const m = s.moduleGraph.getModuleById(moduleId)
			if (!m) continue
			s.moduleGraph.invalidateModule(m)
			s.reloadModule(m)
		}
	})

	const wait = () => {
		if (mainResolver) {
			mainResolver.reject(new Error('wait was called again'))
		}
		mainResolver = Promise.withResolvers?.() ?? withResolvers()
	}

	function* getTokens() {
		for (const plugs of output.values()) {
			for (const values of plugs.values()) {
				for (const t of values) {
					const out = cache.get(t)
					if (out) {
						yield out
						continue
					}
					// should not happen
				}
			}
		}
	}

	async function runDone() {
		await collector.done
		console.log('done')
		await new Promise((r) => setTimeout(r, 1000))
		console.log('release')
		mainResolver?.resolve()
	}

	return {
		/** @type {import('vite').ResolvedConfig | null} */
		config: null,

		cache,
		output,
		servers,
		collector,
		invalidate,

		moduleId,
		moduleFilter: { id: exactRegex(moduleId) },

		wait,

		async generateOutput() {
			await Promise.all([collector.done, mainResolver?.promise])
			return stylesheet(getTokens())
		},
	}
}

export function defaultCollector(timeout = 1000) {
	/** @type {PromiseWithResolvers<void> | null} */
	let resolvers = null

	const bump = debounced(() => {
		if (!resolvers) return
		resolvers.resolve()
		resolvers = null
	}, timeout)

	return {
		init() {
			if (resolvers) return
			resolvers = Promise.withResolvers?.() ?? withResolvers()
			bump()
		},
		bump,
		get done() {
			return resolvers?.promise
		},
	}
}

/**
 * polyfill for `Promise.withResolvers`
 *
 * @template T
 */
function withResolvers() {
	const r = /** @type {PromiseWithResolvers<T>} */ ({})
	r.promise = new Promise((resolve, reject) => {
		Object.assign(r, { resolve, reject })
	})
	return r
}
