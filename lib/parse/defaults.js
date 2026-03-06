import { mapObject } from '../util/lodash.js'

export const defaultBreakpointRem = {
	sm: 40,
	md: 48,
	lg: 64,
	xl: 80,
	'2xl': 96,
}

export const defaultContainerRem = {
	'3xs': 16,
	'2xs': 18,
	xs: 20,
	sm: 24,
	md: 28,
	lg: 32,
	xl: 36,
	'2xl': 42,
	'3xl': 48,
	'4xl': 56,
	'5xl': 64,
	'6xl': 72,
	'7xl': 80,
}

export const defaultRadiiRem = {
	xs: 0.125,
	sm: 0.25,
	md: 0.375,
	lg: 0.5,
	xl: 0.75,
	'2xl': 1,
	'3xl': 1.5,
	'4xl': 2,
}

export const defaultTextSizeRem = {
	xs: 0.75,
	sm: 0.875,
	lg: 1.125,
	xl: 1.25,
	'2xl': 1.5,
	'3xl': 1.875,
	'4xl': 2.25,
	'5xl': 3,
	'6xl': 3.75,
	'7xl': 4.5,
	'8xl': 6,
	'9xl': 8,
}

/** @type {Record<string, number>} */
const lineHeightBase = {
	xs: 1,
	sm: 1.25,
	lg: 1.75,
	xl: 1.75,
	'2xl': 2,
	'3xl': 2.25,
	'4xl': 2.5,
}

export const defaultLineHeights = mapObject(defaultTextSizeRem, (k, v) => {
	const base = lineHeightBase[k]
	return [k, base ? `calc(${base} / ${v})` : '1']
})

export const defaultBlurPx = {
	xs: 4,
	sm: 8,
	md: 12,
	lg: 16,
	xl: 24,
	'2xl': 40,
	'3xl': 64,
}

const lightnessMap = {
	50: 99,
	100: 95,
	200: 87,
	300: 80,
	400: 75,
	500: 60,
	600: 50,
	700: 40,
	800: 35,
	900: 30,
	950: 15,
}

/** @type {Record<string, [number, number]>} */
const colorPalette = {
	neutral: [0, 0],
	rose: [15, 0.15],
	red: [25, 0.15],
	orange: [50, 0.15],
	amber: [70, 0.15],
	yellow: [80, 0.15],
	lime: [130, 0.15],
	green: [150, 0.15],
	emerald: [160, 0.15],
	teal: [185, 0.15],
	cyan: [215, 0.15],
	sky: [240, 0.15],
	blue: [260, 0.15],
	indigo: [280, 0.15],
	violet: [295, 0.15],
	purple: [305, 0.15],
	fuchsia: [325, 0.15],
	pink: [345, 0.15],
	taupe: [40, 0.02],
	stone: [65, 0.02],
	olive: [100, 0.02],
	mist: [200, 0.02],
	slate: [250, 0.02],
	gray: [255, 0.02],
	zinc: [260, 0.02],
	mauve: [300, 0.02],
}

/** @type {Record<string, string>} */
export const defaultColors = {
	black: '#000',
	white: '#FFF',
	...Object.fromEntries(makeColors()),
}

function* makeColors() {
	for (const [name, [hue, chroma]] of Object.entries(colorPalette)) {
		for (const [key, L] of Object.entries(lightnessMap)) {
			yield /** @type {[string, string]} */ ([
				`${name}-${key}`,
				`oklch(${L}% ${chroma} ${hue})`,
			])
		}
	}
}
