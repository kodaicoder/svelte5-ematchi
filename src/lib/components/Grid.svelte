<script lang="ts">
	import Card from './Card.svelte';

	interface Props {
		gridEmojis: string[] | null;
		foundEmojis: string[];
		gridCount: number;
		onfound: (foundedEmoji: string) => void;
	}

	let { gridEmojis = [], gridCount = 0, onfound, foundEmojis }: Props = $props();
	let selectedCardA = $state(-1);
	let selectedCardB = $state(-1);
	let lastSelected = $state(-1);
	let interval: number;

	function onCardClick(event: MouseEvent, index: number) {
		clearTimeout(interval);
		if (selectedCardA == -1 && selectedCardB == -1) {
			selectedCardA = index;
		} else if (selectedCardA != -1 && selectedCardB == -1) {
			selectedCardB = index;
			if (gridEmojis !== null) {
				if (gridEmojis[selectedCardA] === gridEmojis[selectedCardB]) {
					// match
					interval = setTimeout(() => {
						onfound(gridEmojis[selectedCardA]);
						selectedCardA = selectedCardB = -1;
					}, 500);
				} else {
					// not match
					interval = setTimeout(() => {
						selectedCardA = selectedCardB = -1;
					}, 1000);
				}
			}
		} else {
			selectedCardA = index;
			selectedCardB = -1;
		}
	}
</script>

{#if gridEmojis === null}
	<p class="flex h-full items-center justify-center text-2xl">Loading...</p>
{:else}
	<div class="grid_container" style="--gridCount:{gridCount}">
		{#each gridEmojis as gridEmoji, i}
			<Card
				emoji={gridEmoji}
				onclick={(ev: MouseEvent) => onCardClick(ev, i)}
				selected={selectedCardA === i || selectedCardB === i}
				isfound={foundEmojis.includes(gridEmoji)}
				group={gridEmojis.indexOf(gridEmoji) === i ? 'first' : 'second'}
			/>
		{/each}
	</div>
{/if}

<style>
	.grid_container {
		@apply grid h-full grid-cols-[repeat(_var(--gridCount),minmax(0,_1fr))] grid-rows-[repeat(_var(--gridCount),minmax(0,1fr))] gap-2 p-2;
	}
</style>
