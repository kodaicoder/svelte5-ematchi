<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="modal-background">
	<div class="modal">
		{@render children()}
	</div>
</div>

<style lang="postcss">
	@reference "tailwindcss";

	.modal-background {
		@apply fixed top-0 left-0 z-999 grid h-full w-full place-content-center backdrop-blur-md;
	}

	.modal {
		@apply grid place-content-center justify-items-center rounded-2xl bg-[ghostwhite] p-8;
	}
</style>
