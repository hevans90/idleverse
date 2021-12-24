import {
  Box,
  keyframes,
  Text,
  Theme,
  TypographyProps,
  useTheme,
} from '@chakra-ui/react';

type LoadingProps = {
  height?: string;
  width?: string;
  text?: string;
  fontSize?: TypographyProps['fontSize'];
};

export const Loading = ({
  height = '100vh',
  width = '100vw',
  text = 'Loading',
  fontSize = '4xl',
}: LoadingProps | undefined) => {
  const { fontSizes, fonts } = useTheme<Theme>();

  const ellipsis = keyframes`
  to {
    width: 6.5rem;    
  }
}
`;

  const some = {
    _after: {
      overflow: 'hidden',
      position: 'absolute',
      left: '98%',
      verticalAlign: 'bottom',
      animation: `${ellipsis} steps(4,end) 900ms infinite`,
      content: `"..."`,
      width: 0,
      fontSize: `${fontSize}`,
      fontFamily: `${fonts.body}`,
      whiteSpace: 'nowrap',
      letterSpacing: '-15px',
    },
  };

  return (
    <Box
      height={height}
      width={width}
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Text fontSize={fontSize} position="relative" {...some}>
        {text}
      </Text>
    </Box>
  );
};
