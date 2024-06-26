import {
  HStack,
  Icon,
  IconButton,
  StackProps,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useUiBackground } from '@idleverse/theme';
import { MinusPixelIcon, PlusPixelIcon, SlidersPixelIcon } from '@idleverse/ui';
import {
  responsiveFontProps,
  responsiveIconProps,
} from '../_responsive-utils/font-props';

export const ExpandingUI = ({
  icon = <Icon as={SlidersPixelIcon} {...responsiveIconProps} />,
  panelOpen = false,
  onPanelOpenChange,
  stackProps,
  children,
  title,
  titlePosition = 'before',
  footer,
  headerChildren,
}: {
  panelOpen: boolean;
  onPanelOpenChange: () => void;
  children: ReactNode | ReactNode[];

  title?: string;
  titlePosition?: 'before' | 'after';
  icon?: JSX.Element;
  stackProps?: StackProps;
  footer?: ReactNode | ReactNode[];
  headerChildren?: ReactNode | ReactNode[];
}) => {
  const { bg, border } = useUiBackground();

  return (
    <VStack
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      position="absolute"
      padding={[2, 2, 3]}
      {...stackProps}
    >
      <HStack width="100%" justifyContent="space-between">
        {icon}
        {title && titlePosition === 'before' && (
          <Text {...responsiveFontProps}>{title}</Text>
        )}

        {panelOpen && headerChildren}

        <IconButton
          size={['xs', 'sm', 'sm', 'md']}
          aria-label="close drawer"
          icon={
            panelOpen ? (
              <Icon as={MinusPixelIcon} {...responsiveIconProps} />
            ) : (
              <Icon as={PlusPixelIcon} {...responsiveIconProps} />
            )
          }
          onClick={onPanelOpenChange}
        />
        {title && titlePosition === 'after' && (
          <Text {...responsiveFontProps}>{title}</Text>
        )}
      </HStack>
      {panelOpen && children}

      {footer && footer}
    </VStack>
  );
};
