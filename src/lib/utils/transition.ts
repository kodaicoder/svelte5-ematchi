import { cubicOut } from 'svelte/easing';
import { crossfade } from 'svelte/transition';

export const [send, receive] = crossfade({
	duration: 250,
	easing: cubicOut
});
