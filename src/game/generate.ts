export const InitializeCelestials = (
  canvasWidth: number,
  canvasHeight: number,
  count: number
) => {
  const radius = canvasHeight;
  const arms = 3;
  const curvature = 3;
  const arm_width = 0.05;
  const core_radius = radius / 50;
  const core_concentration_bias = 1.5;

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function signedRandom() {
    return 2 * Math.random() - 1;
  }

  let positions = [];
  for (let i = 0; i < count; i++) {
    // Choose a distance from the center of the galaxy.
    let arm = getRandomInt(arms) - 1;
    let theta = Math.pow(Math.random(), core_concentration_bias) * Math.PI * curvature;
    let r =
      (((theta / (Math.PI * 2)) * radius) / curvature) *
      (1 + signedRandom() * arm_width);

    theta += (signedRandom() * Math.PI * core_radius) / r;

    // Convert polar coordinates to 2D cartesian coordinates.
    let x =
      Math.cos(theta + ((2 * Math.PI) / arms) * arm) * r;
    let y =
      Math.sin(theta + ((2 * Math.PI) / arms) * arm) * r;

    // Now we can assign xy coords.
    positions[i] = { x: x, y: y, theta: theta, r: r };
  }
  return positions;
};