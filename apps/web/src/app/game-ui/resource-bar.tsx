import { useReactiveVar } from '@apollo/client';
import {
  HStack,
  Image,
  StackProps,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { empireResourcesVar } from '../_state/galactic-empire';
import { globalUiVar } from '../_state/global-ui';
import { useUiBackground } from '../hooks/use-ui-background';

type ResourceBarProps = StackProps;

export const ResourceBar = ({ ...stackProps }: ResourceBarProps) => {
  const { bg, border, bgLight } = useUiBackground();

  const resources = useReactiveVar(empireResourcesVar);

  const color = useColorModeValue('gray.800', 'white');

  if (!resources.length) {
    return undefined;
  }

  return (
    <HStack
      {...stackProps}
      bgColor={bg}
      borderColor={border}
      borderStyle="solid"
      borderWidth={1}
      borderTopWidth={0}
      padding={2}
      spacing={5}
      opacity={0.9}
      _hover={{ opacity: 1 }}
      cursor="pointer"
      onClick={() => {
        globalUiVar({ ...globalUiVar(), resourceOverviewOpen: true });
      }}
    >
      {resources.map(({ name, value, imageUrl }, i) => (
        <Tooltip
          key={i}
          placement="bottom"
          bg={bgLight}
          color={color}
          label={
            <HStack>
              <Text>{name}</Text>
            </HStack>
          }
        >
          <HStack>
            <Image
              float="left"
              width={['35px', '40px']}
              height={['35px', '40px']}
              src={imageUrl}
              fallbackSrc="/placeholders/75x75-circle.png"
            />
            <Text>{value}</Text>
          </HStack>
        </Tooltip>
      ))}
    </HStack>
  );
};
