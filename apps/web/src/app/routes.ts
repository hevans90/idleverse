import { GalaxyGenContainer } from './canvases/galaxy-generator/galaxy-generator.container';
import { GalaxyViewerContainer } from './canvases/galaxy-viewer/galaxy-viewer.container';
import { GravitySimulationContainer } from './canvases/gravity-simulation/gravity-simulation.container';
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
  { path: '/galaxy-gen', name: 'galaxy-gen', component: GalaxyGenContainer },
  {
    path: '/solar-system',
    name: 'solar-system',
    component: SolarSystemContainer,
  },
  {
    path: '/gravity-sim',
    name: 'gravity sim',
    component: GravitySimulationContainer,
  },
];
