import { HStack, Theme, useTheme, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { ColorPicker } from '../../../components/color-picker';
import { rgb } from '../../../_state/models';
import {
  hexToRGB,
  rgbToHex,
  themeColorToHex,
} from '../../_utils/theme-colour-conversions';

export const ColorQuadPicker = ({
  colors,
  onChange,
}: {
  colors: [rgb, rgb, rgb, rgb];
  onChange: (val: [rgb, rgb, rgb, rgb]) => void;
}) => {
  const { colors: themeColors } = useTheme<Theme>();

  const [localHexColors, setLocalColors] = useState<
    [string, string, string, string]
  >([
    rgbToHex(colors[0]),
    rgbToHex(colors[1]),
    rgbToHex(colors[2]),
    rgbToHex(colors[3]),
  ]);

  useEffect(() => {
    onChange(
      localHexColors.map((hex) => hexToRGB(hex)) as [rgb, rgb, rgb, rgb]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localHexColors]);

  const callback1 = useCallback(
    (val: string) => {
      setLocalColors([
        themeColorToHex(val, themeColors),
        localHexColors[1],
        localHexColors[2],
        localHexColors[3],
      ]);
    },
    [localHexColors, themeColors]
  );
  const callback2 = useCallback(
    (val: string) => {
      setLocalColors([
        localHexColors[1],
        themeColorToHex(val, themeColors),
        localHexColors[2],
        localHexColors[3],
      ]);
    },
    [localHexColors, themeColors]
  );
  const callback3 = useCallback(
    (val: string) => {
      setLocalColors([
        localHexColors[1],
        localHexColors[2],
        themeColorToHex(val, themeColors),
        localHexColors[3],
      ]);
    },
    [localHexColors, themeColors]
  );
  const callback4 = useCallback(
    (val: string) => {
      setLocalColors([
        localHexColors[1],
        localHexColors[2],
        localHexColors[3],
        themeColorToHex(val, themeColors),
      ]);
    },
    [localHexColors, themeColors]
  );

  return (
    <HStack>
      <VStack>
        <ColorPicker
          onChange={callback1}
          defaultColor={rgbToHex(colors[0])}
        ></ColorPicker>
        <ColorPicker
          onChange={callback2}
          defaultColor={rgbToHex(colors[1])}
        ></ColorPicker>
      </VStack>
      <VStack>
        <ColorPicker
          onChange={callback3}
          defaultColor={rgbToHex(colors[2])}
        ></ColorPicker>
        <ColorPicker
          onChange={callback4}
          defaultColor={rgbToHex(colors[3])}
        ></ColorPicker>
      </VStack>
    </HStack>
  );
};
