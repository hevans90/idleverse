import { makeVar } from '@apollo/client';
import { DialogEntry } from '../game-ui/dialog';

export const DialogVar = makeVar<{ open: boolean; entries: DialogEntry[] }>({
  open: true,
  entries: [
    {
      speakerName: 'Gigachad',
      imageUrl: '/races/arrakkens_pixel.png',
      steps: [
        `I'm baby truffaut tacos tilde fixie. Hot chicken occupy live-edge, biodiesel woke try-hard everyday carry. Pok pok photo booth literally freegan blog gastropub meditation hell of squid wayfarers.`,
        'nice to meet ya',
      ],
    },
  ],
});
