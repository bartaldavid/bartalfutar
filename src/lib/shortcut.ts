/** @type {import('svelte/action').Action}  */
export const shortcut = (
  node: HTMLElement,
  params: {
    alt?: boolean;
    shift?: boolean;
    control?: boolean;
    code: string;
    callback?: () => unknown;
  },
) => {
  let handler: (this: Window, ev: KeyboardEvent) => unknown;
  const removeHandler = () => window.removeEventListener('keydown', handler),
    setHandler = () => {
      removeHandler();
      if (!params) return;
      handler = (e: KeyboardEvent) => {
        if (
          !!params.alt != e.altKey ||
          !!params.shift != e.shiftKey ||
          !!params.control != (e.ctrlKey || e.metaKey) ||
          params.code != e.code
        )
          return;
        e.preventDefault();
        params.callback ? params.callback() : node.click();
      };
      window.addEventListener('keydown', handler);
    };
  setHandler();
  return {
    update: setHandler,
    destroy: removeHandler,
  };
};
