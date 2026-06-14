import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  /** Optional leading glyph (emoji or short text). */
  icon?: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  /** Accessible label (also used as the listbox aria-label). */
  ariaLabel?: string;
  /** Associates an external <label htmlFor> with the trigger. */
  id?: string;
  className?: string;
  size?: 'md' | 'sm';
  /** Show a leading icon on the trigger (e.g. 🌐 for language). */
  leadingIcon?: string;
  /** Render only the icon as the trigger (compact); listbox still shows labels. */
  iconOnly?: boolean;
}

/**
 * Custom accessible select (combobox + listbox pattern).
 *
 * Keyboard: Enter/Space/↓ open, ↑/↓ move, Home/End jump, Enter/Space pick,
 * Esc close, type-ahead by first letter. Closes on outside click / blur.
 */
export function Select({
  value,
  onChange,
  options,
  ariaLabel,
  id,
  className = '',
  size = 'md',
  leadingIcon,
  iconOnly = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((o) => o.value === value)),
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reactId = useId();
  const listboxId = `${id ?? reactId}-listbox`;

  const selected = options.find((o) => o.value === value) ?? options[0];

  // Close on outside interaction.
  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  // Keep the active option scrolled into view while navigating.
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  function openMenu() {
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  }

  function commit(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!open) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        commit(activeIndex);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        // Type-ahead: jump to the next option starting with the typed letter.
        if (e.key.length === 1) {
          const lower = e.key.toLowerCase();
          const start = (activeIndex + 1) % options.length;
          for (let n = 0; n < options.length; n += 1) {
            const idx = (start + n) % options.length;
            if (options[idx].label.toLowerCase().startsWith(lower)) {
              setActiveIndex(idx);
              break;
            }
          }
        }
    }
  }

  const pad = size === 'sm' ? 'py-1.5 pl-2.5 pr-9' : 'py-2.5 pl-3.5 pr-9';

  return (
    <div ref={rootRef} className={`relative ${iconOnly ? 'inline-block' : ''} ${className}`}>
      {iconOnly ? (
        <button
          type="button"
          id={id}
          className="grid h-9 w-9 place-items-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 focus:outline-none focus:ring-2 focus:ring-brand-200"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={onKeyDown}
        >
          <span aria-hidden="true" className="text-lg">
            {leadingIcon ?? selected?.icon ?? '▾'}
          </span>
        </button>
      ) : (
        <button
          type="button"
          id={id}
          className={`flex w-full items-center justify-between gap-2 rounded-xl border border-ink-200 bg-white ${pad} text-left text-sm font-medium text-ink-800 transition-colors hover:border-ink-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200`}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          onClick={() => (open ? setOpen(false) : openMenu())}
          onKeyDown={onKeyDown}
        >
          <span className="flex min-w-0 items-center gap-1.5">
            {(leadingIcon || selected?.icon) && (
              <span aria-hidden="true">{leadingIcon ?? selected?.icon}</span>
            )}
            <span className="truncate">{selected?.label}</span>
          </span>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute right-3 text-ink-400 transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          >
            ▾
          </span>
        </button>
      )}

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          id={listboxId}
          aria-label={ariaLabel}
          tabIndex={-1}
          className={`absolute z-40 mt-1 max-h-64 overflow-auto rounded-xl border border-ink-200 bg-white py-1 shadow-lg ${
            iconOnly ? 'right-0 min-w-max' : 'w-full min-w-max'
          }`}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-sm ${
                  isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-700'
                }`}
                onPointerEnter={() => setActiveIndex(index)}
                onClick={() => commit(index)}
              >
                {option.icon && <span aria-hidden="true">{option.icon}</span>}
                <span className="flex-1 truncate">{option.label}</span>
                {isSelected && (
                  <span aria-hidden="true" className="text-brand-600">
                    ✓
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
