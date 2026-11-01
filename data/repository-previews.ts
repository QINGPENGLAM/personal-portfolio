type RepositoryPreview = {
  src: string
  alt: string
  caption: 'Original project artwork' | 'Archived gameplay image' | 'Archived game-over screen'
}

// Matched by visual inspection and the original portfolio's project associations.
// These are historical images, not evidence of current deployment or runtime behavior.
export const repositoryPreviews: Readonly<Partial<Record<string, RepositoryPreview>>> = {
  Calculator: {
    src: '/project-previews/archive/calculator.webp',
    alt: 'Illustrated calculator with dark keys on a pink and turquoise background.',
    caption: 'Original project artwork',
  },
  'food-ordering-': {
    src: '/project-previews/archive/food-ordering.webp',
    alt: 'Food-ordering promotional design with a salad bowl and the heading Order Tasty and Fresh Food anytime.',
    caption: 'Original project artwork',
  },
  topicshare: {
    src: '/project-previews/archive/topicshare.webp',
    alt: 'Yellow educational title graphic with a cartoon cat and the words Topics that I found interesting.',
    caption: 'Original project artwork',
  },
  'Tic-Tac-Toe': {
    src: '/project-previews/archive/tic-tac-toe.webp',
    alt: 'Hand-drawn tic-tac-toe board with black X and O marks on a white background.',
    caption: 'Original project artwork',
  },
  'cube-game': {
    src: '/project-previews/archive/cube-game.webp',
    alt: 'Orange player cube on a turquoise course with dark obstacles ahead.',
    caption: 'Archived gameplay image',
  },
  'random-spawn-dodge': {
    src: '/project-previews/archive/random-spawn-dodge.webp',
    alt: 'Blue game-over screen with falling obstacles, a white player and a Restart button.',
    caption: 'Archived game-over screen',
  },
  'arthistory-RPG': {
    src: '/project-previews/archive/art-history-rpg.webp',
    alt: 'Third-person character in a low-poly green landscape beside an open inventory panel.',
    caption: 'Archived gameplay image',
  },
}
