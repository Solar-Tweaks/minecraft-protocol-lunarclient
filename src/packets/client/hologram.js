module.exports = [
  'container',
  [
    {
      name: 'uuid',
      type: 'UUID',
    },
    {
      name: 'x',
      type: 'f64',
    },
    {
      name: 'y',
      type: 'f64',
    },
    {
      name: 'z',
      type: 'f64',
    },
    {
      name: 'lines',
      type: [
        'array',
        {
          countType: 'varint',
          type: 'string',
        },
      ],
    },
  ],
];
