import { useReactiveVar } from '@apollo/client';
import { GalacticEmpireFieldsFragment } from '@idleverse/galaxy-gql';
import { galacticEmpireVar, myEmpireVar, selfVar } from '@idleverse/state';
import { useEffect } from 'react';

export const useEmpire = (empire: GalacticEmpireFieldsFragment) => {
  const { id: userId } = useReactiveVar(selfVar);

  useEffect(() => {
    if (empire) {
      galacticEmpireVar(empire);

      if (empire.user_id === userId) {
        myEmpireVar(true);
      } else {
        myEmpireVar(false);
      }
    } else {
      galacticEmpireVar(null);
    }
  }, [empire, userId]);
};
