module.exports = [
  'container',
  [
    {
      name: 'leader',
      type: ['option', 'UUID'],
    },
    {
      name: 'lastMs',
      type: 'i64',
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
                name: 'posMap',
                type: [
                  'array',
                  {
                    countType: 'varint',
                    type: [
                      'container',
                      [
                        {
                          name: 'key',
                          type: 'string',
                        },
                        {
                          name: 'value',
                          type: 'f64',
                        },
                      ],
                    ],
                  },
                ],
              },
            ],
          ],
        },
      ],
    },
  ],
];
