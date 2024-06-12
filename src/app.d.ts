import type { AvailableLanguageTag } from '../../lib/paraglide/runtime';
import type { ParaglideLocals } from '@inlang/paraglide-sveltekit';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import 'unplugin-icons/types/svelte';
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      paraglide: ParaglideLocals<AvailableLanguageTag>;
    }
    // 	userId: string | null;
    // }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
