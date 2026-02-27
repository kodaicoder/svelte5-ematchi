export function getTwemojiUrl(emoji: string) {
	const code = emoji.codePointAt(0)?.toString(16);
	return `/twemoji/${code}.svg`;
}
