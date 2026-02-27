export function getTwemojiUrl(emoji: string) {
	// const code = emoji.codePointAt(0)?.toString(16);
	// return `/twemoji/${code}.svg`;
	const codePoints = [...emoji]
		.map((char) => char.codePointAt(0)?.toString(16))
		.filter(Boolean)
		.join('-');
	return `/twemoji/${codePoints}.svg`;
}
