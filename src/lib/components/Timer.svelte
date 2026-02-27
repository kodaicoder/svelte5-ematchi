<script lang="ts">
	interface Props {
		remaining: number;
		duration: number;
		onpause: (state: boolean) => void; //is game paused?
	}
	let { remaining, duration, onpause }: Props = $props();

	function pauseClick() {
		onpause(true);
	}
</script>

<button class="pause_btn" aria-label="pause button" onclick={pauseClick}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-circle-pause"
		><circle cx="12" cy="12" r="10" /><line x1="10" x2="10" y1="15" y2="9" /><line
			x1="14"
			x2="14"
			y1="15"
			y2="9"
		/></svg
	>
</button>
<div class="duration">
	<div class="remaining" style="--remaining: {remaining / duration}"></div>
</div>

<style lang="postcss">
	.pause_btn svg {
		@apply flex size-8 items-center justify-center text-slate-100 transition-all duration-150 hover:text-slate-600;
	}

	.duration {
		@apply h-[4em] w-[75em] rounded-lg bg-gray-300;
	}

	.remaining {
		@apply h-full w-[calc(100%_*_var(--remaining))] rounded-lg bg-green-500;
	}
</style>
