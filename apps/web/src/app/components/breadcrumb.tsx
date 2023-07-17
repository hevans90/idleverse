import { useReactiveVar } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import { celestialVar, galaxyConfigVar, planetVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import { responsiveFontProps } from '../_responsive-utils/font-props';

export const BREADCRUMB_HEIGHT = 55;

export const Breadcrumb = () => {
  const { bg, border } = useUiBackground();

  const { name: galaxyName } = useReactiveVar(galaxyConfigVar);
  const celestial = useReactiveVar(celestialVar);
  const planet = useReactiveVar(planetVar);

  const crumbs = useBreadcrumbs([
    {
      path: '/galaxies/:id',
      breadcrumb: () => <span>{galaxyName}</span>,
    },
    {
      path: '/celestials/:id',
      breadcrumb: () => <span>{celestial?.name}</span>,
    },
    {
      path: '/planets/:id',
      breadcrumb: () => <span>{planet?.name}</span>,
    },
  ]);

  // Don't render a single breadcrumb.
  if (crumbs.length <= 1) {
    return null;
  }
  return (
    <Box
      padding="1rem"
      height={`${BREADCRUMB_HEIGHT}px`}
      display={['none', 'none', 'flex']}
      flexDirection="row"
      position="absolute"
      alignItems="start"
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
        <span key={match.pathname}>
          <Link to={match.pathname}>
            {i !== 0 ? <>&nbsp;&gt;&nbsp;</> : null}
            {breadcrumb}
          </Link>
        </span>
      ))}
    </Box>
  );
};
