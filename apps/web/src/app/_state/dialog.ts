import { makeVar } from '@apollo/client';
import { DialogEntry } from '../game-ui/dialog';

export const DialogVar = makeVar<{ open: boolean; entries: DialogEntry[] }>({
  open: true,
  entries: [
    {
      id: '1',
      speakerName: 'Gigachad',
      imageUrl: '/races/arrakkens_pixel.png',
      steps: [
        `I'm baby truffaut tacos tilde fixie. Hot chicken occupy live-edge, biodiesel woke try-hard everyday carry. Pork belly banh mi PBR&B direct trade skateboard. Bitters literally photo booth health goth. Organic roof party gochujang normcore hoodie austin YOLO hell of tacos PBR&B. Pabst brooklyn banh mi, slow-carb put a bird on it austin tilde XOXO viral pok pok post-ironic copper mug.`,
        'nice to meet ya, Hot chicken occupy live-edge, biodiesel woke try-hard everyday carry.',
        'Art party iPhone biodiesel mustache. Gastropub fanny pack kale chips tumeric vinyl tumblr kinfolk kogi viral knausgaard sartorial. Drinking vinegar fam bespoke narwhal direct trade lyft actually cloud bread flexitarian lo-fi vice normcore.',
        'Meditation tacos iceland unicorn adaptogen air plant squid green juice knausgaard occupy tousled fanny pack mlkshk poutine pitchfork.',
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
      speakerName: 'Avian Lord',
      imageUrl: '/factions/ancients_pixel.png',
      steps: ['What the fuck?!', 'We should do something about this.'],
    },
  ],
});
