module.exports = [
  'container',
  [
    {
      name: 'player',
      type: 'UUID',
    },
    {
      name: 'tags',
      type: [
        'option',
        [
          'array',
          {
            countType: 'varint',
            type: 'string',
          },
        ],
      ],
    },
  ],
];
