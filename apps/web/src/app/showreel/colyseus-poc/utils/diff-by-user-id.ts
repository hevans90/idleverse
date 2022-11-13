export const diffByUserId = <T extends { userId: string }>(
  prev: T[],
  curr: T[]
): { additions: T[]; deletions: T[] } => {
  const additions = curr.filter(
    ({ userId }) => !prev.find(({ userId: id }) => id === userId)
  );

  const deletions = prev.filter(
    ({ userId }) => !curr.find(({ userId: id }) => id === userId)
  );

  return {
    additions: additions.length ? additions : undefined,
    deletions: deletions.length ? deletions : undefined,
  };
};
