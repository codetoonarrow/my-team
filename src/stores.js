import { writable } from "svelte/store";

// Writable store varriable that updates the light/dark mode of the site
export const themeEnabled = writable(false);
