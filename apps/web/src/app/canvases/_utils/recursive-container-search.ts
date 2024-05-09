import { Container, DisplayObject } from 'pixi.js';

export function findChildrenByName({
  container,
  nameSubstring,
}: {
  container: Container;
  nameSubstring: string;
}): DisplayObject[] {
  const matches: DisplayObject[] = [];

  // Check if the container has any children
  if (container.children.length === 0) {
    return matches;
  }

  // Iterate through the children
  for (let i = 0; i < container.children.length; i++) {
    const child = container.children[i];

    // Check if the child's name contains the substring
    if (child.name && child.name.includes(nameSubstring)) {
      matches.push(child);
    }

    // If the child is a container, recursively search its children
    if (child instanceof Container) {
      const foundInChildren = findChildrenByName({
        container: child,
        nameSubstring,
      });
      matches.push(...foundInChildren); // Concatenate arrays
    }
  }

  // Return the array of matches
  return matches;
}
