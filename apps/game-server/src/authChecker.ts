/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthChecker } from 'type-graphql';

export const authChecker: AuthChecker<any> = async (
  // { root, args, context, info },
  { context },
  roles
) => {
  const idTokenRoles: string[] = context.roles;
  for (const role of roles) {
    if (!idTokenRoles.includes(role)) return false;
  }
  return true; // or false if access is denied
};
