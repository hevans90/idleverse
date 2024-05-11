import { makeVar } from '@apollo/client';
import { HydratedMediaResult } from '@idleverse/models';

export type DialogEntry = {
  id: string;
  speakerName: string;
  imageUrl: string;
  steps: string[];
  audio?: HydratedMediaResult;
};

export const dialogVar = makeVar<{ open: boolean; entries: DialogEntry[] }>({
  open: false,
  entries: [],
});
