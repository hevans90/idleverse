import { useReactiveVar } from '@apollo/client';
import { VStack } from '@chakra-ui/layout';
import { HStack, StackDivider, Switch, Text } from '@chakra-ui/react';

import {
  colyseusTrackingDistanceVar,
  colyseusTrackingEnabledVar,
  colyseusTrackingTargetVar,
} from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';

export const ColyseusTrackingInfo = () => {
  const trackingEnabled = useReactiveVar(colyseusTrackingEnabledVar);
  const trackingTarget = useReactiveVar(colyseusTrackingTargetVar);
  const trackingDistance = useReactiveVar(colyseusTrackingDistanceVar);

  const { bg, border } = useUiBackground();

  return (
    <VStack
      {...responsiveFontProps}
      spacing={5}
      padding="1rem"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom={0}
      right={0}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderBottom="unset"
      borderRight="unset"
      divider={<StackDivider borderColor={border} />}
    >
      {trackingTarget && trackingEnabled && (
        <>
          <HStack width="100%" mb={4} justifyContent="space-between">
            <Text mr={5}>target:</Text>
            <Text>{trackingTarget.name}</Text>
          </HStack>
          <HStack>
            <Text mr={5} width="100%" justifyContent="space-between">
              distance:
            </Text>
            <Text minWidth={150} textAlign="right">
              {trackingDistance}
            </Text>
          </HStack>
        </>
      )}
      <HStack width="100%" justifyContent="end">
        <Text minWidth="175px">Tracking</Text>
        <Switch
          size="lg"
          isChecked={trackingEnabled}
          onChange={() =>
            colyseusTrackingEnabledVar(!colyseusTrackingEnabledVar())
          }
        />
      </HStack>
    </VStack>
  );
};
