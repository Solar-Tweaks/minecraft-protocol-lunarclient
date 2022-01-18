module.exports = [
  'container',
  [
    {
      name: 'channel',
      type: 'UUID',
    },
    {
      name: 'name',
      type: 'string',
    },
    {
      name: 'players',
      type: [
        'array',
        {
          countType: 'varint',
          type: [
            'container',
            [
              {
                name: 'player',
                type: 'UUID',
              },
              {
                name: 'displayName',
                type: 'string',
              },
            ],
          ],
        },
      ],
    },
  ],
];
