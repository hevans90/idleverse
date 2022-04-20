import { PlanetCreationInput } from './celestial-types';
import { planetValidator } from './planet-validator';

const input: PlanetCreationInput = {
  celestial_id: 'b741230228a6404323d9f89c4435cd9305345afd',
  id: '55fdc5d3-9668-4a62-813a-417b1c5a1cca',
  name: 'from-game-server',
  owner_id: '',
  radius: 2,
  rings: {
    data: [],
  },
  terrain_bias: [0.2, 0.4, 0.6],
  terrain_hex_palette_id: 'ae0c493b-91a1-4f9f-b84d-6036e913c271',
  texture_resolution: 25,
};

describe('planetValidator', () => {
  it('should output correct errors', () => {
    expect(planetValidator(input)).toMatchSnapshot();
  });
});
