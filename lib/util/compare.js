/** @param {number} c charCode */
const isNumber = (c) => c > 47 && c < 58 // digits 0 - 9 have codes 48 to 57

/**
 * @param {string} [a]
 * @param {string} [b]
 */
export function compare(a, b) {
	if (!a) return b ? 1 : 0
	if (!b) return -1

	const minLen = Math.min(a.length, b.length)

	for (let i = 0; i < minLen; ++i) {
		const aCode = a.charCodeAt(i)
		const bCode = b.charCodeAt(i)

		// both are numbers, extract from string
		if (isNumber(aCode) && isNumber(bCode)) {
			let aEnd = i + 1
			let bEnd = i + 1

			// find the end of the number
			while (isNumber(a.charCodeAt(aEnd))) ++aEnd
			while (isNumber(b.charCodeAt(bEnd))) ++bEnd

			const aNum = a.slice(i, aEnd)
			const bNum = b.slice(i, bEnd)

			// same number, skip this section
			if (aNum === bNum) {
				i = aEnd
				continue
			}

			// compare directly as numbers
			return Number(aNum) - Number(bNum)
		}

		// same char, continue checking along the string
		if (aCode === bCode) continue

		// otherwise, compare the character codes directly
		return aCode - bCode
	}

	// same prefix, shorter string should come first
	return a.length - b.length
}
