<script lang="ts">
	import { Confetti } from 'svelte-confetti';
	import Modal from '$lib/components/Modal.svelte';
	import Game from '$lib/components/Game.svelte';
	import { levels, type Level } from '$lib/interfaces/levels';
	import type { SvelteComponent } from 'svelte';
	type GameState = 'waiting' | 'playing' | 'paused' | 'win' | 'lose';
	let gameState = $state<GameState>('waiting');
	let selectedLevel = $state<Level>();
	let game = $state<SvelteComponent>();
	function selectingLevel(level: Level) {
		selectedLevel = level;
		gameState = 'playing';
	}
	function gameResumeHandler() {
		gameState = 'playing';
		console.log('RESUME CLICKING');
		game?.resume();
	}

	function gamePauseHandler(isPause: boolean) {
		if (isPause) {
			gameState = 'paused';
		}
	}

	function menuHandler() {
		gameState = 'waiting';
	}

	function finishHandler(isWin: boolean) {
		if (isWin) {
			gameState = 'win';
		} else {
			gameState = 'lose';
		}
	}
</script>

{#snippet levelSelector()}
	<div class="flex justify-evenly gap-4">
		{#each levels as level, i}
			<button
				class=" rounded-md border-2 border-slate-800 bg-slate-200 p-4 transition-all duration-150 hover:bg-slate-500"
				onclick={() => {
					selectingLevel(level);
				}}
			>
				{level.label}
			</button>
		{/each}
	</div>
{/snippet}

{#if gameState !== 'playing'}
	<Modal>
		<div id="title" class="">
			{#if gameState === 'waiting'}
				<h1 class="text-5xl">
					<span class="text-emoji">🤯</span>e<span class="text-violet-800">match</span>i<span
						class="text-emoji">🤯</span
					>
				</h1>
				<div class="text-center">
					<p>The emoji matching game</p>
					<p class="my-4">Choose a level</p>
				</div>
			{:else if gameState === 'paused'}
				<h1 class="mb-4 text-3xl">
					<span class="text-emoji">⏸️</span>PAUSE<span class="text-emoji">⏸️</span>
				</h1>
			{:else if gameState === 'win'}
				<h1 class="text-center text-3xl leading-[3rem]">
					<span class="text-emoji text-5xl">🏆</span><br />Congratulation <br />You Win
				</h1>
				<div class="my-4 text-center">
					<p>want to try again ?</p>
				</div>
				<div
					style="
            position: fixed;
            top: -50px;
            left: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            overflow: hidden;
            pointer-events: none;"
				>
					<Confetti
						x={[-5, 5]}
						y={[0, 0.1]}
						delay={[500, 2000]}
						infinite
						duration={5000}
						amount={100}
						fallDistance="100vh"
					/>
				</div>
			{:else if gameState === 'lose'}
				<h1 class="text-center text-3xl leading-[3rem]">
					<span class="text-emoji text-5xl">⏱️</span><br />Time Up!
				</h1>
				<div class="my-4 text-center">
					<p>want to try again ?</p>
				</div>
			{/if}
		</div>
		<div id="action" class="flex w-full justify-evenly">
			{#if gameState === 'waiting'}
				{@render levelSelector()}
			{:else if gameState === 'paused'}
				<div class="flex justify-evenly gap-4">
					<button
						class="rounded-md border-2 border-slate-800 bg-slate-200 p-4 transition-all duration-150 hover:bg-slate-500"
						onclick={gameResumeHandler}
					>
						Resume
					</button>
					<button
						class="rounded-md border-2 border-slate-800 bg-slate-200 p-4 transition-all duration-150 hover:bg-slate-500"
						onclick={menuHandler}
					>
						Menu
					</button>
				</div>
			{:else if gameState === 'win'}
				{@render levelSelector()}
			{:else if gameState === 'lose'}
				{@render levelSelector()}
			{/if}
		</div>
	</Modal>
{/if}
<Game
	bind:this={game}
	level={selectedLevel}
	onPause={gamePauseHandler}
	onWin={finishHandler}
	onLose={finishHandler}
/>
