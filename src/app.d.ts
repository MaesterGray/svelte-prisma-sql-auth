// See https://svelte.dev/docs/kit/types#app.d.ts

import type { SessionValidationResult } from "$lib";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		 interface Locals {
			userAndSession:SessionValidationResult
		 }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
