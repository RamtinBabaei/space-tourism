import type { KeyboardEvent } from 'react';

type Props = { labels: string[]; selected: number; onSelect: (index: number) => void; name: string; variant?: 'text' | 'dots' | 'numbers'; };

export function Tabs({ labels, selected, onSelect, name, variant = 'text' }: Props) {
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const index = event.key === 'Home' ? 0 : event.key === 'End' ? labels.length - 1 :
      (selected + (['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1) + labels.length) % labels.length;
    onSelect(index);
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus();
  }
  return <div className={`tabs tabs--${variant}`} role="tablist" aria-label={name} aria-orientation={variant === 'numbers' ? 'vertical' : 'horizontal'} onKeyDown={onKeyDown}>
    {labels.map((label, index) => <button key={label} type="button" id={`${name}-tab-${index}`} role="tab" aria-selected={index === selected} aria-controls={`${name}-panel`} aria-label={label} tabIndex={index === selected ? 0 : -1} onClick={() => onSelect(index)}>
      {variant === 'numbers' ? index + 1 : variant === 'dots' ? <span className="sr-only">{label}</span> : label}
    </button>)}
  </div>;
}
