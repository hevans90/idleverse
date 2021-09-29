/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthChecker } from 'type-graphql';

export const authChecker: AuthChecker<any> = async (
  // { root, args, context, info },
  { context },
  roles
) => {
  if (roles.length === 0) return true;

  const idTokenRoles: string[] =
    context.user[process.env.HASURA_NAMESPACE]['x-hasura-allowed-roles'];
  for (const role of roles) {
    if (!idTokenRoles.includes(role)) return false;
  }
  return true; // or false if access is denied
};
