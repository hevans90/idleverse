import { Grid } from '@chakra-ui/react';
import { hexToRGB, rgb, rgbToHex, themeColorToHex } from '@idleverse/theme';
import { useCallback, useEffect, useState } from 'react';
import { ColorPicker } from '../../../components/color-picker';

import { colors as themeColors } from '@idleverse/theme';

export const ColorQuadPicker = ({
  colors,
  onChange,
}: {
  colors: [rgb, rgb, rgb, rgb];
  onChange: (val: [rgb, rgb, rgb, rgb]) => void;
}) => {
  // un-comment for debug
  // useEffect(() => {
  //   console.log('INITIAL RENDER in QUAD PICKER');
  //   console.log(
  //     '%c 1 ' + ' %c 3 ',
  //     `background: ${rgbToHex(colors[0])}; color: #bada55`,
  //     `background: ${rgbToHex(colors[2])}; color: #bada55`
  //   );
  //   console.log(
  //     '%c 2 ' + ' %c 4 ',
  //     `background: ${rgbToHex(colors[1])}; color: #bada55`,
  //     `background: ${rgbToHex(colors[3])}; color: #bada55`
  //   );
  // });

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
        localHexColors[0],
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
        localHexColors[0],
        localHexColors[1],
        themeColorToHex(val, themeColors),
        localHexColors[3],
      ]);
    },
    [localHexColors, themeColors]
  );
  const callback4 = useCallback(
    (val: string) => {
      setLocalColors([
        localHexColors[0],
        localHexColors[1],
        localHexColors[2],
        themeColorToHex(val, themeColors),
      ]);
    },
    [localHexColors, themeColors]
  );

  return (
    <Grid templateColumns="repeat(2, 25px)" gap="5px">
      <ColorPicker
        onChange={callback1}
        defaultColor={rgbToHex(colors[0])}
      ></ColorPicker>
      <ColorPicker
        onChange={callback2}
        defaultColor={rgbToHex(colors[1])}
      ></ColorPicker>
      <ColorPicker
        onChange={callback3}
        defaultColor={rgbToHex(colors[2])}
      ></ColorPicker>
      <ColorPicker
        onChange={callback4}
        defaultColor={rgbToHex(colors[3])}
      ></ColorPicker>
    </Grid>
  );
};
