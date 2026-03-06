import { describe, it, expect } from 'vitest'
import { h } from '../lib/parse/handlers.js'

describe('handlers', () => {
	it('passthrough', () => {
		expect(h._('1')).toBe('1')
		expect(h._('foo')).toBe('foo')
	})

	it('global', () => {
		expect(h.global('inherit')).toBe('inherit')
		expect(h.global('foo')).toBeUndefined()
	})

	it('raw', () => {
		expect(h.raw('[foo]')).toBe('foo')
		expect(h.raw('[-foo_bar]')).toBe('-foo bar')
	})

	it('rawPreserve', () => {
		expect(h.rawPreserve('[foo]')).toBe('foo')
		expect(h.rawPreserve('[-foo_bar]')).toBe('-foo_bar')
		expect(h.rawPreserve('[url(/foo_bar.jpg)]')).toBe('url(/foo_bar.jpg)')
	})

	it('number', () => {
		expect(h.number('10')).toBe('10')
		expect(h.number('10', { n: true })).toBe('-10')
		expect(h.number('1.5')).toBe('1.5')
		expect(h.number('1.5', { n: true })).toBe('-1.5')
		expect(h.number('foo')).toBeUndefined()
		expect(h.number('123foo')).toBeUndefined()
		expect(h.number('foo123')).toBeUndefined()
	})

	it('px', () => {
		expect(h.px('px')).toBe('1px')
		expect(h.px('px', { n: true })).toBe('-1px')
		expect(h.px('10px')).toBe('10px')
		expect(h.px('10')).toBe('10px')
		expect(h.px('10', { n: true })).toBe('-10px')
		expect(h.px('1.5')).toBe('1.5px')
		expect(h.px('1.5', { n: true })).toBe('-1.5px')
	})

	it('percent', () => {
		expect(h.percent('10%')).toBe('10%')
		expect(h.percent('10')).toBe('10%')
		expect(h.percent('10', { n: true })).toBe('-10%')
		expect(h.percent('1.5')).toBe('1.5%')
		expect(h.percent('1.5', { n: true })).toBe('-1.5%')
	})

	it('ratio', () => {
		expect(h.ratio('1/2')).toBe('1 / 2')
		expect(h.ratio('4/3')).toBe('4 / 3')
		expect(h.ratio('foo')).toBeUndefined()
		expect(h.ratio('12')).toBeUndefined()
	})

	it('fraction', () => {
		expect(h.fraction('1/2')).toBe('0.5')
		expect(h.fraction('foo')).toBeUndefined()
	})

	it('fractionAsPercent', () => {
		expect(h.fractionAsPercent('1/2')).toBe('calc(1 / 2 * 100%)')
		expect(h.fractionAsPercent('foo')).toBeUndefined()
	})

	it('screen', () => {
		expect(h.screen('screen', { d: 'w' })).toBe('100vw')
		expect(h.screen('screen', { d: 'h' })).toBe('100vh')
		expect(h.screen('screen')).toBeUndefined()
		expect(h.screen('foo')).toBeUndefined()
	})

	it('screenSize', () => {
		expect(h.screenSize('dvh')).toBe('100dvh')
		expect(h.screenSize('svw')).toBe('100svw')
		expect(h.screenSize('foo')).toBeUndefined()
	})

	it('spacing', () => {
		expect(h.spacing('1')).toBe('var(--spacing)')
		expect(h.spacing('1.5')).toBe('calc(var(--spacing) * 1.5)')
		expect(h.spacing('1', { n: true })).toBe('calc(var(--spacing) * -1)')
		expect(h.spacing('2', { n: true })).toBe('calc(var(--spacing) * -2)')
		expect(h.spacing('foo')).toBeUndefined()
	})

	it('numberTo', () => {
		const nTo = h.numberTo((n) => `rem(${n})`)
		expect(nTo('10')).toBe('rem(10)')

		expect(h.numberTo('calc(\0 * 1rem)')('10')).toBe('calc(10 * 1rem)')
	})

	it('split', () => {
		expect(h.split('foo-bar')).toEqual('foo bar')
		expect(h.split('foo-bar-baz')).toEqual('foo bar baz')
	})

	it('replace', () => {
		expect(h.replace('foo', 'bar')('foo-baz')).toBe('bar-baz')
	})

	it('tshirtTo', () => {
		const tTo = h.tshirtTo((s) => `size(${s})`)
		expect(tTo('sm')).toBe('size(sm)')
		expect(tTo('foo')).toBeUndefined()

		expect(h.tshirtTo('\0-br')('xl')).toBe('xl-br')
	})

	it('tshirtVar', () => {
		const tVar = h.tshirtVar('font-size', { sm: '12px' })
		expect(String(tVar('sm'))).toBe('var(--font-size-sm)')
		expect(tVar('sm')?.['--font-size-sm']).toBe('12px')
		expect(String(tVar('md'))).toBe('var(--font-size-md)')
		expect(tVar('foo')).toBeUndefined()
	})

	it('rewrite', () => {
		expect(h.rewrite('foo')('bar')).toBe('foo')
		expect(h.rewrite((s) => `bar-${s}`)('foo')).toBe('bar-foo')
	})

	it('asVar', () => {
		const aVar = h.asVar('color', { red: 'red' })
		expect(String(aVar('red'))).toBe('var(--color-red)')
		expect(aVar('red')['--color-red']).toBe('red')
		expect(String(aVar('blue'))).toBe('var(--color-blue)')
	})

	it('cssvarOf', () => {
		const cVar = h.cssvarOf({ type: 'color', defaults: { '--foo': 'red' } })
		expect(String(cVar('(color:--foo)'))).toBe('var(--foo)')
		expect(cVar('(color:--foo)')?.['--foo']).toBe('red')
		expect(cVar('(--bar)')).toBeUndefined()
		expect(cVar('(image:--bar)')).toBeUndefined()

		const anyVar = h.cssvarOf({})
		expect(String(anyVar('(--bar)'))).toBe('var(--bar)')
	})
})
