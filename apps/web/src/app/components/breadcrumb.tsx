import { useReactiveVar } from '@apollo/client';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { responsiveFontProps } from '../_responsive-utils/font-props';
import { planetVar } from '../_state/planet-viewer';
import { celestialVar, galaxyConfigVar } from '../_state/reactive-variables';

export const Breadcrumb = () => {
  const bg = useColorModeValue('gray.300', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

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
      display="flex"
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
