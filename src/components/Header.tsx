import { useEffect, useRef, useState } from 'react';
import { asset, pages, type Page } from '../data';

export function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  useEffect(() => setOpen(false), [page]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    navigation.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const close = () => { setOpen(false); toggle.current?.focus(); };
    function handleKey(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const items = [toggle.current, ...Array.from(navigation.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
    const media = window.matchMedia('(min-width: 701px)');
    const resize = () => { if (media.matches) close(); };
    document.addEventListener('keydown', handleKey); media.addEventListener('change', resize);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', handleKey); media.removeEventListener('change', resize); };
  }, [open]);
  return <header className="site-header">
    <a href="#/" className="brand" aria-label="Space Tourism home"><img src={asset('shared/logo.svg')} alt="" width="48" height="48" /></a>
    <div className="header-line" aria-hidden="true" />
    <button type="button" ref={toggle} className={`menu-toggle ${open ? 'is-open' : ''}`} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}><span/><span/><span/></button>
    {open && <div className="menu-backdrop" onClick={() => { setOpen(false); toggle.current?.focus(); }} />}
    <nav id="primary-navigation" ref={navigation} className={`primary-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
      {pages.map((item, index) => <a key={item} href={item === 'home' ? '#/' : `#/${item}`} aria-current={page === item ? 'page' : undefined} onClick={() => setOpen(false)}><span className="nav-number">0{index}</span>{item}</a>)}
    </nav>
  </header>;
}
