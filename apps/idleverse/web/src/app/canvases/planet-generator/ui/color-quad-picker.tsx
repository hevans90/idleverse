import { HStack, Theme, useTheme, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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

  return (
    <HStack>
      <VStack>
        <ColorPicker
          onChange={(val) => {
            console.log('converting to hex:', val);

            setLocalColors([
              themeColorToHex(val, themeColors),
              localHexColors[1],
              localHexColors[2],
              localHexColors[3],
            ]);
          }}
          defaultColor={rgbToHex(colors[0])}
        ></ColorPicker>
        <ColorPicker
          onChange={(val) => {
            setLocalColors([
              localHexColors[0],
              themeColorToHex(val, themeColors),
              localHexColors[2],
              localHexColors[3],
            ]);
          }}
          defaultColor={rgbToHex(colors[1])}
        ></ColorPicker>
      </VStack>
      <VStack>
        <ColorPicker
          onChange={(val) => {
            setLocalColors([
              localHexColors[0],
              localHexColors[1],
              themeColorToHex(val, themeColors),
              localHexColors[3],
            ]);
          }}
          defaultColor={rgbToHex(colors[2])}
        ></ColorPicker>
        <ColorPicker
          onChange={(val) => {
            setLocalColors([
              localHexColors[0],
              localHexColors[1],
              localHexColors[2],
              themeColorToHex(val, themeColors),
            ]);
          }}
          defaultColor={rgbToHex(colors[3])}
        ></ColorPicker>
      </VStack>
    </HStack>
  );
};
