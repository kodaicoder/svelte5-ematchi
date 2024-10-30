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

<style>
	.modal-background {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(10px);
		display: grid;
		place-content: center;
		z-index: 999;
	}

	.modal {
		background-color: ghostwhite;
		padding: 2rem;
		border-radius: 1rem;
		display: grid;
		place-content: center;
		justify-items: center;
	}
</style>
