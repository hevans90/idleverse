import { TechnologiesQuery } from '@idleverse/galaxy-gql';
import { useApp } from '@inlet/react-pixi';
import { Container } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { useResize } from '../../canvases/_utils/use-resize.hook';
import { useViewport } from '../../canvases/_utils/use-viewport.hook';
import {
  createTreeFromQuery,
  TechnologyNode,
} from './utils/create-tree-from-query';
import { Tree } from './utils/tree-structure';

export const ResearchTree = ({
  technologies,
}: {
  technologies: TechnologiesQuery['technology'];
}) => {
  const app = useApp();
  const containerRef = useRef(new Container());
  const treeRef = useRef<Tree<TechnologyNode>>();

  const size = useResize();

  useViewport({ app, containerRef, size });

  useEffect(() => {
    if (technologies.length) {
      treeRef.current = createTreeFromQuery(technologies);
      console.log(treeRef.current);
      console.log([...treeRef.current.preOrderTraversal()].map((x) => x.value));
    }
  }, [technologies]);

  return <></>;
};
