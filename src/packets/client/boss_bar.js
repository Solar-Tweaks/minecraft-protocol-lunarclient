module.exports = [
  'container',
  [
    {
      name: 'action',
      type: 'varint',
    },
    {
      name: 'data',
      type: [
        'switch',
        {
          compareTo: 'action',
          fields: {
            0: [
              'container',
              {
                name: 'text',
                type: 'string',
              },
              {
                name: 'health',
                type: 'f32',
              },
            ],
          },
          default: 'void',
        },
      ],
    },
  ],
];
