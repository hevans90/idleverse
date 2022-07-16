import { Box, Theme, useTheme } from '@chakra-ui/react';
import { hexStringToNumber } from '@idleverse/theme';
import { Stage } from '@inlet/react-pixi';
import { useEffect, useState } from 'react';
import { assetLoader } from '../../asset-loading/asset-loader';
import { Loading } from '../../components/loading';
import { AssetCollection } from '../../_state/models';
import { useResize } from '../_utils/use-resize.hook';
import { IsometricTiles } from './isometric-tiles';

export const IsometricContainer = () => {
  const size = useResize();
  const { colors } = useTheme<Theme>();

  const [assetsLoading, setAssetsLoading] = useState<boolean>(true);
  const [assetCollection, setAssetCollection] = useState<AssetCollection>();

  useEffect(() => {
    assetLoader([
      { name: 'zoom-in', url: 'isometric-tiles/zoom-in.png' },
      { name: 'zoom-out', url: 'isometric-tiles/zoom-out.png' },
      { name: 'dirt', url: 'isometric-tiles/dirt_tile.png' },
    ]).then((collection) => {
      setAssetCollection(collection);
      setAssetsLoading(false);
    });
  }, []);

  if (assetsLoading) {
    return <Loading text="Loading assets"></Loading>;
  }

  if (!assetsLoading && assetCollection) {
    return (
      <Box position="relative">
        <Stage
          {...size}
          options={{
            backgroundColor: hexStringToNumber(colors.gray['800']),
            antialias: true,
          }}
        >
          <IsometricTiles
            assetCollection={assetCollection}
            colors={{
              tileColor: `${hexStringToNumber(colors.gray['700'])}`,
              hoverColor: `${hexStringToNumber(colors.teal['600'])}`,
              selectedColor: `${hexStringToNumber(colors.gray['600'])}`,
            }}
          />
        </Stage>
        {/* UI with absolute positioning */}
      </Box>
    );
  }
};
