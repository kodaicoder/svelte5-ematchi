<script lang="ts">
	import { send } from '$lib/utils/transition';
	import { getTwemojiUrl } from '$lib/utils/twemojiMapper';

	interface Props {
		emoji: string;
		selected: boolean;
		onclick: any;
		isfound: boolean;
		group: 'first' | 'second';
	}

	let { emoji, selected, onclick, isfound, group }: Props = $props();
</script>

<div class="card">
	{#if !isfound}
		<button
			class="card_button"
			{onclick}
			disabled={selected || isfound}
			class:founded={isfound}
			class:flipped={selected && !isfound}
		>
			<div class="frontface">
				<img
					alt={emoji}
					src={getTwemojiUrl(emoji)}
					class="emoji"
					out:send={{ key: `${emoji}:${group}` }}
				/>
			</div>
			<div class="backface"></div>
		</button>
	{/if}
</div>

<style>
	.card {
		@apply flex items-center justify-center;
	}
	.flipped {
		@apply z-10 rounded-[1em] [transform:rotateY(180deg)];
	}

	.card_button {
		@apply relative flex h-full w-full items-center justify-center rounded-[1em] transition-transform duration-300 [transform-style:preserve-3d];
	}

	button:disabled {
		@apply cursor-default;
	}

	.founded {
		@apply border-none bg-transparent;
	}

	.frontface {
		@apply absolute flex h-full w-full place-content-center items-center border-4 border-solid border-violet-300 bg-slate-600 [backface-visibility:hidden] [transform:rotateY(180deg)];
	}

	.emoji {
		@apply pointer-events-none z-30 h-[6em] w-[6em];
	}

	.backface {
		@apply absolute h-full w-full border-4 border-solid border-violet-300 bg-slate-800 [backface-visibility:hidden];
	}
</style>
