<script lang="ts">
	import { receive } from '$lib/utils/transition';
	import { getTwemojiUrl } from '$lib/utils/twemojiMapper';

	interface Props {
		foundEmojis: string[];
	}
	let { foundEmojis }: Props = $props();
</script>

{#each foundEmojis as emoji}
	<div class="pair">
		<img
			src={getTwemojiUrl(emoji)}
			class="emoji"
			alt={emoji}
			in:receive={{ key: `${emoji}:first` }}
		/>
		<img
			src={getTwemojiUrl(emoji)}
			class="emoji"
			alt={emoji}
			in:receive={{ key: `${emoji}:second` }}
		/>
	</div>
{/each}

<style>
	.emoji {
		@apply absolute z-30 h-[4em] w-[4em];
	}
	.pair {
		@apply flex h-[4em] w-[4em] items-center justify-center rounded-full bg-slate-200 p-[3em] shadow-lg shadow-violet-500/50;
	}
</style>
