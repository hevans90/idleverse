/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Vector } from 'matter-js';

// Function to compute the convex hull of a set of Vectors using RIC algorithm
function convexHull(Vectors: Vector[]): Vector[] {
  // Sort Vectors by x-coordinate
  Vectors.sort((a, b) => a.x - b.x);

  // Initialize the hull
  const hull: Vector[] = [];

  // Lower hull
  for (const Vector of Vectors) {
    while (
      hull.length >= 2 &&
      orientation(hull[hull.length - 2], hull[hull.length - 1], Vector) <= 0
    ) {
      hull.pop();
    }
    hull.push(Vector);
  }

  // Upper hull
  const upperStartIndex = hull.length + 1;
  for (let i = Vectors.length - 2; i >= 0; i--) {
    const Vector = Vectors[i];
    while (
      hull.length >= upperStartIndex &&
      orientation(hull[hull.length - 2], hull[hull.length - 1], Vector) <= 0
    ) {
      hull.pop();
    }
    hull.push(Vector);
  }

  // Remove the last Vector (it's a duplicate of the first Vector)
  hull.pop();

  return hull;
}

// Function to determine the orientation of three Vectors (p, q, r)
function orientation(p: Vector, q: Vector, r: Vector): number {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (val === 0) return 0; // Collinear
  return val > 0 ? 1 : -1; // Clockwise or counterclockwise
}

// Function to generate random convex irregular polygon
export function getRandomConvexIrregularPolygon(
  numVertices: number,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): Vector[] {
  // Generate random Vectors within the specified range
  const Vectors: Vector[] = [];
  for (let i = 0; i < numVertices; i++) {
    const x = Math.random() * (maxX - minX) + minX;
    const y = Math.random() * (maxY - minY) + minY;
    Vectors.push({ x, y });
  }

  // Compute the convex hull of the generated Vectors
  return convexHull(Vectors);
}
