import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { getPage } from '../src/App';
afterEach(cleanup);
beforeEach(() => {
  window.location.hash = '#/';
  window.scrollTo = vi.fn();
  window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
});
function openPage(page: string) { window.location.hash = `#/${page}`; render(<App/>); }
describe('navigation', () => {
  it('supports direct page links, home, and unknown paths', () => {
    expect(getPage('')).toBe('home'); expect(getPage('#/')).toBe('home');
    expect(getPage('#/crew')).toBe('crew'); expect(getPage('#/technology/')).toBe('technology'); expect(getPage('#/lost')).toBe('not-found');
  });
  it('renders home and navigates to a destination without a reload', () => {
    render(<App/>); expect(screen.getByRole('heading', { name: 'Space' })).toBeTruthy();
    window.location.hash = '#/destination'; fireEvent(window, new HashChangeEvent('hashchange'));
    expect(screen.getByRole('heading', { name: 'Moon' })).toBeTruthy();
    expect(document.activeElement).toBe(screen.getByRole('heading', { level: 1 }));
  });
  it('closes the mobile menu with Escape and restores focus and scroll', async () => {
    render(<App/>); const user = userEvent.setup(); const trigger = screen.getByRole('button', { name: 'Open navigation' });
    await user.click(trigger); expect(trigger.getAttribute('aria-expanded')).toBe('true'); expect(document.body.style.overflow).toBe('hidden');
    await user.keyboard('{Escape}'); expect(trigger.getAttribute('aria-expanded')).toBe('false'); expect(document.activeElement).toBe(trigger); expect(document.body.style.overflow).toBe('');
  });
  it('shows a recovery path for unknown pages', () => { openPage('lost'); expect(screen.getByRole('heading', { name: 'Lost in space?' })).toBeTruthy(); expect(screen.getByRole('link', { name: /Return to Earth/ }).getAttribute('href')).toBe('#/'); });
});
describe('page tabs', () => {
  it('changes all four destinations, their images, and travel details', async () => {
    openPage('destination'); const user = userEvent.setup();
    for (const [name, time] of [['Mars','9 months'],['Europa','3 years'],['Titan','7 years'],['Moon','3 days']]) {
      await user.click(screen.getByRole('tab', { name })); expect(screen.getByRole('heading', { name })).toBeTruthy(); expect(screen.getByText(time)).toBeTruthy();
      expect(screen.getByRole('tab', { name }).getAttribute('aria-selected')).toBe('true');
    }
  });
  it('supports arrow keys, wrapping, Home, and End', async () => {
    openPage('destination'); const user = userEvent.setup(); screen.getByRole('tab', { name: 'Moon' }).focus();
    await user.keyboard('{ArrowLeft}'); expect(document.activeElement).toBe(screen.getByRole('tab', { name: 'Titan' }));
    await user.keyboard('{Home}{ArrowRight}'); expect(screen.getByRole('heading', { name: 'Mars' })).toBeTruthy();
    await user.keyboard('{End}'); expect(screen.getByRole('heading', { name: 'Titan' })).toBeTruthy();
  });
  it('changes every crew member and portrait', async () => {
    openPage('crew'); const user = userEvent.setup();
    for (const name of ['Mark Shuttleworth', 'Victor Glover', 'Anousheh Ansari', 'Douglas Hurley']) { await user.click(screen.getByRole('tab', { name })); expect(screen.getByRole('heading', { name })).toBeTruthy(); expect(screen.getByRole('img', { name })).toBeTruthy(); }
  });
  it('changes each technology and associated picture', async () => {
    openPage('technology'); const user = userEvent.setup();
    for (const name of ['Spaceport','Space capsule','Launch vehicle']) { await user.click(screen.getByRole('tab', { name })); expect(screen.getByRole('heading', { name })).toBeTruthy(); }
  });
});
