const Haikunator = require('haikunator')

const shortNouns = [
  'art',
  'band',
  'bar',
  'base',
  'bird',
  'block',
  'boat',
  'bonus',
  'bread',
  'brook',
  'cake',
  'cell',
  'cloud',
  'dawn',
  'dew',
  'disk',
  'dream',
  'dust',
  'field',
  'fire',
  'fog',
  'frog',
  'frost',
  'glade',
  'grass',
  'hall',
  'hat',
  'heart',
  'hill',
  'king',
  'lab',
  'lake',
  'leaf',
  'limit',
  'math',
  'mode',
  'moon',
  'mouse',
  'mud',
  'night',
  'paper',
  'pine',
  'pond',
  'queen',
  'rain',
  'rice',
  'river',
  'scene',
  'sea',
  'shape',
  'sky',
  'smoke',
  'snow',
  'sound',
  'star',
  'sun',
  'surf',
  'term',
  'tooth',
  'tree',
  'truth',
  'union',
  'unit',
  'voice',
  'water',
  'wave',
  'wind',
]

const shortAdjectives = [
  'aged',
  'autumn',
  'blue',
  'broad',
  'calm',
  'cold',
  'cool',
  'damp',
  'dawn',
  'dry',
  'empty',
  'fancy',
  'flat',
  'floral',
  'frosty',
  'gentle',
  'green',
  'hidden',
  'icy',
  'jolly',
  'late',
  'lively',
  'lucky',
  'misty',
  'muddy',
  'mute',
  'odd',
  'old',
  'orange',
  'plain',
  'proud',
  'purple',
  'quiet',
  'rapid',
  'red',
  'round',
  'royal',
  'shiny',
  'shy',
  'silent',
  'snowy',
  'spring',
  'square',
  'steep',
  'still',
  'summer',
  'super',
  'sweet',
  'white',
  'winter',
  'yellow',
  'young',
]

export const haikunator = new Haikunator({
  adjectives: shortAdjectives,
  nouns: shortNouns,
})
