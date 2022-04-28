import { CelestialViewerContainer } from './canvases/celestial-viewer/celestial-viewer.container';
import { GalaxyGenContainer } from './canvases/galaxy-generator/galaxy-generator.container';
import { GalaxyViewerContainer } from './canvases/galaxy-viewer/galaxy-viewer.container';
import { GravitySimulationContainer } from './canvases/gravity-simulation/gravity-simulation.container';
import { OrbitsContainer } from './canvases/orbits/orbits.container';
import { PlanetGenerator } from './canvases/planet-generator/planet-generator';
import { SolarSystemContainer } from './canvases/solar-system/solar-system.container';
import { GalaxyGalleryContainer } from './galaxy-gallery/galaxy-gallery.container';
import { Home } from './home/home';

export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/galaxies', name: 'galaxies', component: GalaxyGalleryContainer },
  {
    path: '/galaxies/:id',
    name: 'view-galaxy',
    component: GalaxyViewerContainer,
  },
  {
    path: '/celestials/:id',
    name: 'view-celestial',
    component: CelestialViewerContainer,
  },
  { path: '/galaxy-gen', name: 'galaxy-gen', component: GalaxyGenContainer },
  {
    path: '/solar-system',
    name: 'solar-system',
    component: SolarSystemContainer,
  },
  {
    path: '/orbits',
    name: 'orbits',
    component: OrbitsContainer,
  },
  {
    path: '/gravity-sim',
    name: 'gravity-sim',
    component: GravitySimulationContainer,
  },
  {
    path: '/planet-gen',
    name: 'planet-gen',
    component: PlanetGenerator,
  },
];
