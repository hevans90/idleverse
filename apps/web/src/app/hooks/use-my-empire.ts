import { useReactiveVar } from '@apollo/client';
import { GalacticEmpireFieldsFragment } from '@idleverse/galaxy-gql';
import { useEffect } from 'react';
import { galacticEmpireVar } from '../_state/galactic-empire';
import { selfVar } from '../_state/reactive-variables';

export const useMyEmpire = (empire: GalacticEmpireFieldsFragment) => {
  const { id: userId } = useReactiveVar(selfVar);

  useEffect(() => {
    if (empire && empire.user_id === userId) {
      galacticEmpireVar(empire);
    } else {
      galacticEmpireVar(null);
    }
  }, [empire, userId]);
};
