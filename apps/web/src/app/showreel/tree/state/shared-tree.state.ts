import { makeVarPersisted } from '../../../_state/utils';

export const treeSettingsVar = makeVarPersisted<{
  panelOpen: boolean;
  separation: number;
  depthMulti: number;
  nodeRadius: number;
  snapBack: boolean;
}>(
  {
    panelOpen: false,
    separation: 2.75,
    depthMulti: 250,
    nodeRadius: 50,
    snapBack: true,
  },
  'treeSettings'
);
