import { makeVar } from '@apollo/client';

export type DialogEntry = {
  id: string;
  speakerName: string;
  imageUrl: string;
  steps: string[];
};

export const dialogVar = makeVar<{ open: boolean; entries: DialogEntry[] }>({
  open: false,
  entries: [
    {
      id: '1',
      speakerName: 'Harkas Sanima',
      imageUrl: '/npcs/harkas_sanima.png',
      steps: [
        `You called?`,
        'Wait... something is wrong with comms... commander??? <fades out>',
      ],
    },
    {
      id: '2',
      speakerName: '????',
      imageUrl: '/factions/nihils_pixel.png',
      steps: ['DIE', 'CONSUME'],
    },
    {
      id: '3',
      speakerName: 'Ancient Entity',
      imageUrl: '/factions/ancients_pixel.png',
      steps: ['<unintelligble>', '<SCREAMS>'],
    },
  ],
});
