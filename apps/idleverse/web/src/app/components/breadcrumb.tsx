import { useReactiveVar } from '@apollo/client';
import { Box, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { breadCrumbsVar, galaxyConfigVar } from '../_state/reactive-variables';

export const Breadcrumb = () => {
  const bg = useColorModeValue('gray.300', 'gray.700');
  const border = useColorModeValue('gray.200', 'gray.600');

  const crumbs = useReactiveVar(breadCrumbsVar);

  const { name: galaxyName } = useReactiveVar(galaxyConfigVar);

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
    >
      {/* Link back to any previous steps of the breadcrumb. */}
      {crumbs.map(({ name, path }, key) => {
        if (key + 1 === crumbs.length) {
          if (name === 'view-galaxy') {
            name = galaxyName;
          }

          return <span key={key}>{name}</span>;
        } else {
          return (
            <Link key={key} to={path}>
              {name}&nbsp;&gt;&nbsp;
            </Link>
          );
        }
      })}
    </Box>
  );
};
