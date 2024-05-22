/* eslint-disable @typescript-eslint/no-explicit-any */

import { AuthChecker } from 'type-graphql';
import { Context } from './datasources/context';

import {} from 'graphql-scalars';

export const authChecker: AuthChecker<any> = async (
  { context }: { context: Context },
  roles
) => {
  if (roles.length === 0) return true;
  if (!context?.roles) {
    console.warn('No roles present in JWT.');
    throw new Error('ACCESS DENIED: You have no roles.');
  }

  const idTokenRoles: string[] = context.roles;

  for (const role of roles) {
    if (!idTokenRoles.includes(role)) {
      throw new Error(
        `ACCESS DENIED: You need to have role: ${role} for this action.`
      );
    }
  }
  return true; // or false if access is denied
};
