import { SolarSystem } from './canvases/solar-system/solar-system';

export const local = window.location.origin.includes('localhost');

export const App = () => {
  return <SolarSystem />;
};
