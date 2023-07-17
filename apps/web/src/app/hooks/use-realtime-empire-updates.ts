import { useReactiveVar, useSubscription } from '@apollo/client';
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
  ResourceGeneratorsByEmpireIdDocument,
  ResourceGeneratorsByEmpireIdSubscription,
  ResourceGeneratorsByEmpireIdSubscriptionVariables,
} from '@idleverse/galaxy-gql';
import {
  ResourceGenerator,
  activeQuestsVar,
  completedQuestsVar,
  empireNpcsVar,
  empireResourcesVar,
  resourcesVar,
} from '@idleverse/state';
import { useEffect } from 'react';

export const useRealtimeEmpireUpdates = (empireId: string) => {
  const resources = useReactiveVar(resourcesVar);

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
    data: resourceGeneratorsData,
    loading: resourceGeneratorsLoading,
    error: resourceGeneratorsError,
  } = useSubscription<
    ResourceGeneratorsByEmpireIdSubscription,
    ResourceGeneratorsByEmpireIdSubscriptionVariables
  >(ResourceGeneratorsByEmpireIdDocument, {
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
      let data = resourcesData.galactic_empire_resources.map(
        ({ value, resource_type }) => ({
          id: resource_type.id,
          imageUrl: resources.find(
            ({ id: resourceId }) => resourceId === resource_type.id
          )?.image_url,
          name: resource_type.type,
          value,
          generationRate: 0,
          generators: [],
        })
      );

      if (resourceGeneratorsData) {
        const generation: {
          resourceId: string;
          rate: number;
          generators: ResourceGenerator[];
        }[] = resources.map(({ id }) => ({
          resourceId: id,
          rate: 0,
          generators: [],
        }));

        resourceGeneratorsData.galactic_empire_resource_generator.forEach(
          ({ resource_generator_type }) => {
            const [rate1] = resource_generator_type.generation_rate;
            const index1 = generation.findIndex(
              ({ resourceId: id }) =>
                id === resource_generator_type.resource_type.id
            );

            generation[index1].rate += rate1;
            generation[index1].generators.push({
              name: resource_generator_type.name,
              rate: rate1,
            });

            if (resource_generator_type?.resource_type_2) {
              const [_, rate2] = resource_generator_type.generation_rate;

              const index2 = generation.findIndex(
                ({ resourceId: id }) =>
                  id === resource_generator_type.resource_type_2.id
              );
              generation[index2].rate += rate2;
              generation[index2].generators.push({
                name: resource_generator_type.name,
                rate: rate2,
              });
            }
          }
        );

        data = data.map((resource) => {
          const res = generation.find(
            ({ resourceId: id }) => id === resource.id
          );

          return {
            ...resource,
            generationRate: res?.rate,
            generators: res?.generators,
          };
        });
      }
      empireResourcesVar(data);
    }
  }, [resourcesData, resources, resourceGeneratorsData]);

  useEffect(() => {
    if (npcsData) {
      empireNpcsVar(npcsData.galactic_empire_npc.map(({ npc }) => npc));
    }
  }, [npcsLoading, npcsData]);

  useEffect(() => {
    if (activeQuestsData) {
      activeQuestsVar(activeQuestsData.galactic_empire_quest);
    }
  }, [activeQuestsLoading, activeQuestsData]);

  useEffect(() => {
    if (completedQuestsData) {
      completedQuestsVar(completedQuestsData.galactic_empire_quest);
    }
  }, [completedQuestsLoading, completedQuestsData]);
};
