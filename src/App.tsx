import { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { asset, crew, destinations, pages, technologies, type Page } from './data';

export function getPage(hash: string): Page | 'not-found' {
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '');
  return path === '' ? 'home' : pages.includes(path as Page) ? path as Page : 'not-found';
}
function PageHeading({ number, children }: { number: string; children: string }) {
  return <h1 className="page-heading" tabIndex={-1}><span>{number}</span>{children}</h1>;
}
function Home() {
  return <main id="main-content" className="home-main">
    <div className="home-copy enter">
      <p className="eyebrow">So, you want to travel to</p>
      <h1 tabIndex={-1}>Space</h1>
      <p className="body-copy">Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!</p>
    </div>
    <a className="explore enter" href="#/destination"><span>Explore</span><span className="explore-arrow" aria-hidden="true">↗</span></a>
    <div className="home-caption"><span className="caption-line"/>A new perspective awaits</div>
  </main>;
}
function Destination() {
  const [selected, select] = useState(0); const item = destinations[selected];
  return <main id="main-content" className="inner-main destination-main">
    <PageHeading number="01">Pick your destination</PageHeading>
    <div className="destination-grid">
      <div className="planet-stage"><img key={item.image} className="planet enter" src={asset(`destination/image-${item.image}.webp`)} alt={`The ${item.name === 'Moon' ? 'Moon' : item.name} viewed from space`} width="445" height="445" /></div>
      <div className="destination-copy">
        <Tabs name="destinations" labels={destinations.map(d => d.name)} selected={selected} onSelect={select}/>
        <section role="tabpanel" id="destinations-panel" aria-labelledby={`destinations-tab-${selected}`} tabIndex={0}>
          <div key={item.name} className="enter"><h2 className="destination-title">{item.name}</h2><p className="body-copy">{item.description}</p>
            <dl className="destination-stats"><div><dt>Avg. distance</dt><dd>{item.distance}</dd></div><div><dt>Est. travel time</dt><dd>{item.travel}</dd></div></dl>
          </div>
        </section>
      </div>
    </div>
  </main>;
}
function Crew() {
  const [selected, select] = useState(0); const person = crew[selected];
  return <main id="main-content" className="inner-main crew-main">
    <PageHeading number="02">Meet your crew</PageHeading>
    <div className="crew-grid">
      <div className="crew-copy"><section role="tabpanel" id="crew-panel" aria-labelledby={`crew-tab-${selected}`} tabIndex={0}>
        <div key={person.name} className="enter"><p className="crew-role">{person.role}</p><h2 className="crew-name">{person.name}</h2><p className="body-copy">{person.bio}</p></div>
      </section><Tabs name="crew" labels={crew.map(p => p.name)} variant="dots" selected={selected} onSelect={select}/></div>
      <div className="crew-image-stage"><img key={person.image} className="crew-image enter" src={asset(`crew/image-${person.image}.webp`)} alt={person.name} /></div>
    </div>
  </main>;
}
function Technology() {
  const [selected, select] = useState(0); const item = technologies[selected];
  return <main id="main-content" className="inner-main technology-main">
    <PageHeading number="03">Space launch 101</PageHeading>
    <div className="technology-grid"><Tabs name="technology" labels={technologies.map(t => t.name)} variant="numbers" selected={selected} onSelect={select}/>
      <section role="tabpanel" id="technology-panel" aria-labelledby={`technology-tab-${selected}`} tabIndex={0} className="technology-copy">
        <div key={item.name} className="enter"><p className="eyebrow small">The terminology…</p><h2 className="technology-title">{item.name}</h2><p className="body-copy">{item.description}</p></div>
      </section>
      <picture key={item.image} className="technology-image enter"><source media="(max-width: 1050px)" srcSet={asset(`technology/image-${item.image}-landscape.jpg`)}/><img src={asset(`technology/image-${item.image}-portrait.jpg`)} alt={item.name === 'Launch vehicle' ? 'Rocket launching into the sky' : item.name === 'Spaceport' ? 'A coastal space launch facility' : 'A space capsule above Earth'}/></picture>
    </div>
  </main>;
}

export default function App() {
  const [page, setPage] = useState(() => getPage(window.location.hash));
  const previousPage = useRef(page);
  useEffect(() => {
    const change = () => setPage(getPage(window.location.hash));
    window.addEventListener('hashchange', change);
    return () => window.removeEventListener('hashchange', change);
  }, []);
  useEffect(() => {
    document.title = `${page === 'home' ? 'Beyond the ordinary' : page === 'not-found' ? 'Page not found' : page[0].toUpperCase() + page.slice(1)} | Space Tourism`;
    if (previousPage.current !== page) { window.scrollTo({ top: 0, behavior: 'instant' }); document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true }); }
    previousPage.current = page;
  }, [page]);
  return <div className={`app page--${page === 'not-found' ? 'home' : page}`}>
    <a href="#main-content" className="skip-link" onClick={event => { event.preventDefault(); const main = document.getElementById('main-content'); main?.setAttribute('tabindex', '-1'); main?.focus(); }}>Skip to content</a>
    <Header page={page === 'not-found' ? 'home' : page}/>
    <div key={page} className="page-content">{page === 'home' ? <Home/> : page === 'destination' ? <Destination/> : page === 'crew' ? <Crew/> : page === 'technology' ? <Technology/> : <main id="main-content" className="not-found"><h1 tabIndex={-1}>Lost in space?</h1><p>This page is beyond our flight plan.</p><a href="#/">Return to Earth ↗</a></main>}</div>
    <footer className="site-footer"><span>Beyond the ordinary.</span><span>Space tourism concept · Frontend Mentor</span></footer>
  </div>;
}
