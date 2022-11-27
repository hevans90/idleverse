import { CelestialViewerContainer } from './canvases/celestial-viewer/celestial-viewer.container';
import { GalaxyGenContainer } from './canvases/galaxy-generator/galaxy-generator.container';
import { GalaxyViewerContainer } from './canvases/galaxy-viewer/galaxy-viewer.container';

import { PlanetGenerator } from './canvases/planet-generator/planet-generator';
import { PlanetViewer } from './canvases/planet-viewer/planet-viewer';
import { JoinGalaxy } from './empire-creation/join-galaxy';
import { GalaxyGalleryContainer } from './galaxy-gallery/galaxy-gallery.container';
import { Home } from './home/home';
import { ColyseusContainer } from './showreel/colyseus-poc/colyseus-container';
import { GravitySimulationContainer } from './showreel/gravity-simulation/gravity-simulation.container';
import { IsometricContainer } from './showreel/isometric-tiles/isometric.container';
import { Showreel } from './showreel/showreel';
import { QuestTreeContainer } from './showreel/tree/quest-tree-container';
import { TechTreeContainer } from './showreel/tree/tech-tree-container';

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
  {
    path: '/colyseus-poc',
    name: 'colyseus poc',
    component: ColyseusContainer,
  },
  {
    path: '/tech-tree',
    name: 'tech tree',
    component: TechTreeContainer,
  },
  {
    path: '/quest-tree',
    name: 'quest tree',
    component: QuestTreeContainer,
  },
];
