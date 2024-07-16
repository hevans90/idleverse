export const randomPointInAnnulus = ({
  dimensions,
  center,
}: {
  dimensions: { outerRadius: number; innerRadius: number };
  center: { x: number; y: number };
}) => {
  // generate a random angle
  const theta = Math.random() * 2 * Math.PI;

  // generate a random distance
  const radius =
    Math.sqrt(Math.random()) *
      (dimensions.outerRadius - dimensions.innerRadius) +
    dimensions.innerRadius;

  // Convert polar coordinates to Cartesian coordinates
  return {
    x: radius * Math.cos(theta) + center.x,
    y: radius * Math.sin(theta) + center.y,
    radius,
  };
};
