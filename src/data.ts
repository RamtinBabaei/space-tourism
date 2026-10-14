export const pages = ['home', 'destination', 'crew', 'technology'] as const;
export type Page = typeof pages[number];
export const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export const destinations = [
  { name: 'Moon', image: 'moon', description: 'See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.', distance: '384,400 km', travel: '3 days' },
  { name: 'Mars', image: 'mars', description: 'Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!', distance: '225 mil. km', travel: '9 months' },
  { name: 'Europa', image: 'europa', description: 'The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.', distance: '628 mil. km', travel: '3 years' },
  { name: 'Titan', image: 'titan', description: 'The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the rings of Saturn.', distance: '1.6 bil. km', travel: '7 years' },
];
export const crew = [
  { name: 'Douglas Hurley', role: 'Commander', image: 'douglas-hurley', bio: 'Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.' },
  { name: 'Mark Shuttleworth', role: 'Mission specialist', image: 'mark-shuttleworth', bio: 'Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.' },
  { name: 'Victor Glover', role: 'Pilot', image: 'victor-glover', bio: 'Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station, Victor Glover is a commander in the U.S. Navy. He was a crew member of Expedition 64 and served as a station systems flight engineer.' },
  { name: 'Anousheh Ansari', role: 'Flight engineer', image: 'anousheh-ansari', bio: 'Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.' },
];
export const technologies = [
  { name: 'Launch vehicle', image: 'launch-vehicle', description: 'A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth’s surface to space, usually to Earth orbit or beyond. Our launch vehicle concept stands over 150 metres tall. Quite an awe-inspiring sight on the launch pad!' },
  { name: 'Spaceport', image: 'spaceport', description: 'A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. The fictional spaceport in this experience is situated at Cape Canaveral, with the Earth’s rotation helping a rocket on its way to orbit.' },
  { name: 'Space capsule', image: 'space-capsule', description: 'A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth’s atmosphere without wings. It’s where you spend your time during the flight. This tourism concept includes a space gym, cinema, and other activities to keep you entertained.' },
];
