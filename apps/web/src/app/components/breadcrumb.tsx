/* eslint-disable react/jsx-no-useless-fragment */
import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import styled from '@emotion/styled';
import { celestialVar, galaxyConfigVar, planetVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { responsiveFontProps } from '../_responsive-utils/font-props';

export const BREADCRUMB_HEIGHT = '40px';

export const InlineSpan = styled.span`
  display: inline-flex;
  height: 100%;
  align-items: center;
`;

export const Breadcrumb = () => {
  const { bg, border } = useUiBackground();

  const { name: galaxyName } = useReactiveVar(galaxyConfigVar);
  const celestial = useReactiveVar(celestialVar);
  const planet = useReactiveVar(planetVar);

  const crumbs = useBreadcrumbs([
    {
      path: '/galaxies/:name',
      breadcrumb: () => <>{galaxyName}</>,
    },
    {
      path: '/celestials/:name',
      breadcrumb: () => <>{celestial?.name}</>,
    },
    {
      path: '/planets/:name',
      breadcrumb: () => <>{planet?.name}</>,
    },
  ]);

  // Don't render a single breadcrumb.
  if (crumbs.length <= 1) {
    return null;
  }
  return (
    <Box
      padding={[3, 3, 2]}
      height={BREADCRUMB_HEIGHT}
      display={['none', 'none', 'flex']}
      flexDirection="row"
      position="absolute"
      justifyContent="center"
      bgColor={bg}
      top="0"
      left="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderLeft="unset"
      borderTop="unset"
      zIndex="2"
      {...responsiveFontProps}
    >
      {crumbs.map(({ key, match, breadcrumb }, i) => (
        <Link key={match.pathname} to={match.pathname}>
          {i !== 0 ? <>&nbsp;&gt;&nbsp;</> : null}
          <InlineSpan>{breadcrumb}</InlineSpan>
        </Link>
      ))}
    </Box>
  );
};
