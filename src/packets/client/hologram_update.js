module.exports = [
  'container',
  [
    {
      name: 'uuid',
      type: 'UUID',
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
