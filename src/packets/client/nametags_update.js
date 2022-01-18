module.exports = [
  'container',
  [
    {
      name: 'size',
      type: 'varint',
    },
    {
      name: 'players',
      type: [
        'switch',
        {
          compareTo: 'size',
          fields: {
            '-1': 'void',
          },
          default: [
            'array',
            {
              count: 'size',
              type: [
                'container',
                [
                  {
                    name: 'player',
                    type: 'UUID',
                  },
                  {
                    name: 'tags',
                    type: [
                      'array',
                      {
                        countType: 'varint',
                        type: 'string',
                      },
                    ],
                  },
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
];
