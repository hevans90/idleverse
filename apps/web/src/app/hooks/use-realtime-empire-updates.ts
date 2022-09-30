import { useSubscription } from '@apollo/client';
import {
  ActiveGalacticEmpireQuestsDocument,
  ActiveGalacticEmpireQuestsSubscription,
  ActiveGalacticEmpireQuestsSubscriptionVariables,
  CompletedGalacticEmpireQuestsDocument,
  CompletedGalacticEmpireQuestsSubscription,
  CompletedGalacticEmpireQuestsSubscriptionVariables,
  GalacticEmpireNpcsDocument,
  GalacticEmpireNpcsSubscription,
  GalacticEmpireNpcsSubscriptionVariables,
  GalacticEmpireResourcesDocument,
  GalacticEmpireResourcesSubscription,
  GalacticEmpireResourcesSubscriptionVariables,
} from '@idleverse/galaxy-gql';
import { useEffect } from 'react';
import {
  activeQuestsVar,
  completedQuestsVar,
  empireNpcsVar,
  empireResourcesVar,
} from '../_state/galactic-empire';

export const useRealtimeEmpireUpdates = (empireId: string) => {
  const {
    data: resourcesData,
    loading: resourcesLoading,
    error: resourcesError,
  } = useSubscription<
    GalacticEmpireResourcesSubscription,
    GalacticEmpireResourcesSubscriptionVariables
  >(GalacticEmpireResourcesDocument, {
    variables: { empireId },
  });

  const {
    data: npcsData,
    loading: npcsLoading,
    error: npcsError,
  } = useSubscription<
    GalacticEmpireNpcsSubscription,
    GalacticEmpireNpcsSubscriptionVariables
  >(GalacticEmpireNpcsDocument, {
    variables: { empireId },
  });

  const {
    data: activeQuestsData,
    loading: activeQuestsLoading,
    error: activeQuestsError,
  } = useSubscription<
    ActiveGalacticEmpireQuestsSubscription,
    ActiveGalacticEmpireQuestsSubscriptionVariables
  >(ActiveGalacticEmpireQuestsDocument, {
    variables: { empireId },
  });

  const {
    data: completedQuestsData,
    loading: completedQuestsLoading,
    error: completedQuestsError,
  } = useSubscription<
    CompletedGalacticEmpireQuestsSubscription,
    CompletedGalacticEmpireQuestsSubscriptionVariables
  >(CompletedGalacticEmpireQuestsDocument, {
    variables: { empireId },
  });

  useEffect(() => {
    if (resourcesData) {
      empireResourcesVar(resourcesData.galactic_empire_resources);
    }
  }, [resourcesLoading, resourcesData]);

  useEffect(() => {
    if (npcsData) {
      empireNpcsVar(npcsData.galactic_empire_npc.map(({ npc }) => npc));
    }
    //
  }, [npcsLoading, npcsData]);

  useEffect(() => {
    if (activeQuestsData) {
      activeQuestsVar(activeQuestsData.galactic_empire_quest);
    }
    //
  }, [activeQuestsLoading, activeQuestsData]);

  useEffect(() => {
    if (completedQuestsData) {
      completedQuestsVar(completedQuestsData.galactic_empire_quest);
    }
    //
  }, [completedQuestsLoading, completedQuestsData]);
};
