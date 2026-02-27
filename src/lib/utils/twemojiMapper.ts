export function getTwemojiUrl(emoji: string) {
	const codePoints = [...emoji]
		.map((char) => char.codePointAt(0)?.toString(16))
		.filter(Boolean)
		.join('-');
	return `/twemoji/${codePoints}.svg`;
}
