import { CelestialViewerContainer } from './canvases/celestial-viewer/celestial-viewer.container';
import { GalaxyGenContainer } from './canvases/galaxy-generator/galaxy-generator.container';
import { GalaxyViewerContainer } from './canvases/galaxy-viewer/galaxy-viewer.container';
import { GravitySimulationContainer } from './canvases/gravity-simulation/gravity-simulation.container';
import { IsometricContainer } from './canvases/isometric-tiles/isometric.container';
import { PlanetGenerator } from './canvases/planet-generator/planet-generator';
import { PlanetViewer } from './canvases/planet-viewer/planet-viewer';
import { SolarSystemContainer } from './canvases/solar-system/solar-system.container';
import { JoinGalaxy } from './empire-creation/join-galaxy';
import { GalaxyGalleryContainer } from './galaxy-gallery/galaxy-gallery.container';
import { Home } from './home/home';
import { Showreel } from './showreel/showreel';

export const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/showreel', name: 'showreel', component: Showreel },
  { path: '/galaxies', name: 'galaxies', component: GalaxyGalleryContainer },
  {
    path: '/galaxies/:id',
    name: 'view-galaxy',
    component: GalaxyViewerContainer,
  },
  {
    path: '/galaxies/:id/join',
    name: 'view-galaxy',
    component: JoinGalaxy,
  },
  {
    path: '/celestials/:id',
    name: 'view-celestial',
    component: CelestialViewerContainer,
  },
  {
    path: '/planets/:id',
    name: 'view-planet',
    component: PlanetViewer,
  },
  { path: '/galaxy-gen', name: 'galaxy-gen', component: GalaxyGenContainer },
  {
    path: '/solar-system',
    name: 'solar-system',
    component: SolarSystemContainer,
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
  {
    path: '/isometric-tiles',
    name: 'isometric tiles',
    component: IsometricContainer,
  },
];
