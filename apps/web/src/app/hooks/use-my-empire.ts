import { useReactiveVar } from '@apollo/client';
import { GalacticEmpireFieldsFragment } from '@idleverse/galaxy-gql';
import { useEffect } from 'react';
import { galacticEmpireVar, myEmpireVar } from '../_state/galactic-empire';
import { selfVar } from '../_state/reactive-variables';

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
