<script lang="ts">
	import { levels, type Level } from '$lib/interfaces/levels';
	import FoundBar from './FoundBar.svelte';
	import Grid from './Grid.svelte';
	import Timer from './Timer.svelte';

	interface Props {
		level?: Level;
		onPlay?: (isPlay: boolean) => void;
		onWin?: (isWin: boolean) => void;
		onLose?: (isWin: boolean) => void;
		onPause?: (isPause: boolean) => void;
	}

	let { level, onPlay, onWin, onLose, onPause }: Props = $props();

	let size = $derived.by(() => level?.size ?? 0);
	// let gridEmojis = $state<string[] | null>(null);
	let gridEmojis = $derived.by(() => {
		if (level !== undefined) {
			return createCardGrid(level);
		}
		return null;
	});
	let foundEmojis = $state<string[]>([]);

	let duration = $derived.by(() => level?.duration ?? 0);
	let remaining = $derived.by(() => level?.duration ?? 1);
	let playing = $derived.by(() => {
		return level !== undefined;
	});
	let interval: ReturnType<typeof setInterval>;

	$effect(() => {
		if (level !== undefined) {
			countDown();
			return () => clearInterval(interval);
		}
	});

	function createCardGrid(level: Level) {
		const selectedEmojis = level!.emojis
			.slice(0, (size * size) / 2)
			.sort(() => Math.random() - 0.5);
		// return a duplicate of selected emojis (made it can pair able) and shuffle it
		return [...selectedEmojis, ...selectedEmojis].sort(() => Math.random() - 0.5);
	}

	function onFound(foundedEmoji: string) {
		foundEmojis = [...foundEmojis, foundedEmoji];
		if (foundEmojis.length === (size * size) / 2) {
			clearInterval(interval);
			foundEmojis = []; // win then reset found emojis to empty
			onWin?.(true);
		}
	}

	function countDown() {
		interval = setInterval(() => {
			if (playing) {
				remaining -= 250;
				if (remaining <= 0) {
					clearInterval(interval);
					foundEmojis = []; // lose then reset found emojis to empty
					onLose?.(false);
				}
			}
		}, 250);
	}

	export function resume() {
		playing = true;
		onPlay?.(true);
	}

	function onpause(state: boolean) {
		playing = false;
		onPause?.(state);
	}
</script>

{#if level}
	<div class="game">
		<div id="timer_container" class="info">
			<Timer {duration} {remaining} {onpause} />
		</div>
		<div id="card_container" class="grid-container">
			<Grid {gridEmojis} gridCount={size} {onFound} {foundEmojis} --gridCount={size} />
		</div>
		<div id="found_container" class="info">
			<FoundBar {foundEmojis} />
		</div>
	</div>
{/if}

<style lang="postcss">
	.game {
		@apply flex h-full flex-col items-center justify-center text-[1vmin] lg:text-[0.35rem];
	}

	.info {
		@apply my-4 flex h-[10em] w-[80em] items-center justify-center gap-2;
	}

	.grid-container {
		@apply h-[80em] w-[80em];
	}
</style>
