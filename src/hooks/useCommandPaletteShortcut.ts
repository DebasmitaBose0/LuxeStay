import { useEffect, useState } from 'react';

/**
 * useCommandPaletteShortcut — manages global Ctrl+K / Cmd+K shortcut.
 */
export function useCommandPaletteShortcut() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return { isOpen, setIsOpen };
}
