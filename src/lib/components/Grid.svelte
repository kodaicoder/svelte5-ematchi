<script lang="ts">
	import Card from './Card.svelte';

	interface Props {
		gridEmojis: string[] | null;
		foundEmojis: string[];
		gridCount: number;
		onFound: (foundedEmoji: string) => void;
	}

	let { gridEmojis = [], gridCount = 0, onFound, foundEmojis }: Props = $props();
	let selected = $state({
		cardA: -1,
		cardB: -1
	});
	let interval: ReturnType<typeof setInterval>;

	function onCardClick(event: MouseEvent, index: number) {
		clearTimeout(interval);
		if (selected.cardA == -1 && selected.cardB == -1) {
			selected.cardA = index;
		} else if (selected.cardB == -1) {
			selected.cardB = index;
			if (gridEmojis && gridEmojis[selected.cardA] === gridEmojis[selected.cardB]) {
				// match
				interval = setTimeout(() => {
					onFound(gridEmojis[selected.cardA]);
					selected.cardA = selected.cardB = -1;
				}, 300);
			} else {
				// not match
				interval = setTimeout(() => {
					selected.cardA = selected.cardB = -1;
				}, 1000);
			}
		} else {
			selected.cardA = index;
			selected.cardB = -1;
		}
	}
</script>

{#if gridEmojis === null}
	<p class="flex h-full items-center justify-center text-2xl">Loading...</p>
{:else}
	<div class="grid_container">
		{#each gridEmojis as gridEmoji, i (`${gridEmoji}-${i}`)}
			<Card
				emoji={gridEmoji}
				onclick={(ev: MouseEvent) => onCardClick(ev, i)}
				selected={selected.cardA === i || selected.cardB === i}
				isfound={foundEmojis.includes(gridEmoji)}
				group={gridEmojis.indexOf(gridEmoji) === i ? 'first' : 'second'}
			/>
		{/each}
	</div>
{/if}

<style lang="postcss">
	@reference "tailwindcss";

	.grid_container {
		@apply grid h-full grid-cols-[repeat(var(--gridCount,4),minmax(0,1fr))] grid-rows-[repeat(var(--gridCount,4),minmax(0,1fr))] gap-2 p-2;
	}
</style>
