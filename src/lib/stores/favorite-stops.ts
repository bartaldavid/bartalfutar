import type { components } from '../data/bkk-openapi';

// FIXME this type declaration shouldn't be here

export type savedStop = components['schemas']['TransitStop'] & {
  routeRef?: {
    [key: string]: components['schemas']['TransitRoute'] | undefined;
  };
};
