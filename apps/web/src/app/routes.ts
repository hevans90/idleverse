import { lazy } from 'react';

const Admin = lazy(() => import('./admin/admin'));
const CelestialViewerContainer = lazy(
  () => import('./canvases/celestial-viewer/celestial-viewer.container')
);
const GalaxyGenContainer = lazy(
  () => import('./canvases/galaxy-generator/galaxy-generator.container')
);
const GalaxyViewerContainer = lazy(
  () => import('./canvases/galaxy-viewer/galaxy-viewer.container')
);
const PlanetGenerator = lazy(
  () => import('./canvases/planet-generator/planet-generator')
);
const PlanetViewer = lazy(
  () => import('./canvases/planet-viewer/planet-viewer')
);
const JoinGalaxy = lazy(() => import('./empire-creation/join-galaxy'));
const GalaxyGalleryContainer = lazy(
  () => import('./galaxy-gallery/galaxy-gallery.container')
);
const ColyseusContainer = lazy(
  () => import('./showreel/colyseus-poc/colyseus-container')
);
const GravitySimulationContainer = lazy(
  () => import('./showreel/gravity-simulation/gravity-simulation.container')
);
const IsometricContainer = lazy(
  () => import('./showreel/isometric-tiles/isometric.container')
);
const Showreel = lazy(() => import('./showreel/showreel'));
const QuestTreeContainer = lazy(
  () => import('./showreel/tree/quest-tree-container')
);
const TechTreeContainer = lazy(
  () => import('./showreel/tree/tech-tree-container')
);

const Home = lazy(() => import('./home/home'));

export const routes: {
  path: string;
  name: string;
  component: (args: unknown) => JSX.Element;
  adminOnly?: boolean;
}[] = [
  { path: '/', name: 'home', component: Home },
  { path: '/admin', name: 'admin', component: Admin, adminOnly: true },
  { path: '/showreel', name: 'showreel', component: Showreel },
  { path: '/galaxies', name: 'galaxies', component: GalaxyGalleryContainer },
  {
    path: '/galaxies/:id',
    name: 'view galaxy',
    component: GalaxyViewerContainer,
  },
  {
    path: '/galaxies/:id/join',
    name: 'view galaxy',
    component: JoinGalaxy,
  },
  {
    path: '/celestials/:id',
    name: 'view celestial',
    component: CelestialViewerContainer,
  },
  {
    path: '/planets/:id',
    name: 'view planet',
    component: PlanetViewer,
  },
  { path: '/galaxy-gen', name: 'galaxy-gen', component: GalaxyGenContainer },
  {
    path: '/gravity-sim',
    name: 'gravity sim',
    component: GravitySimulationContainer,
  },
  {
    path: '/planet-gen',
    name: 'planet gen',
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
