const heroClasses = [
  {
    name: 'TANK',
    values: ['d_va', 'orisa', 'reinhardt', 'roadhog', 'winston', 'wrecking_ball', 'zarya'],
  },
  {
    name: 'DAMAGE',
    values: [
      'ashe',
      'bastion',
      'doomfist',
      'genji',
      'hanzo',
      'junkrat',
      'mccree',
      'mei',
      'pharah',
      'reaper',
      'soldier_76',
      'sombra',
      'symmetra',
      'torbjorn',
      'tracer',
      'widowmaker',
    ],
  },
  { name: 'SUPPORT', values: ['ana', 'brigitte', 'lucio', 'mercy', 'moira', 'zenyatta'] },
];

function mapNameToClass(name) {
  name = name.toLowerCase();
  for(const heroClass of heroClasses) {
    if(heroClass.values.includes(name)) {
      return heroClass.name;
    }
  }

  return 'UNKNOWN;'
}

module.exports = { mapNameToClass };
