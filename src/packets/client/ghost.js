module.exports = [
  'container',
  [
    {
      name: 'addGhostList',
      type: [
        'array',
        {
          countType: 'varint',
          type: 'UUID',
        },
      ],
    },
    {
      name: 'removeGhostList',
      type: [
        'array',
        {
          countType: 'varint',
          type: 'UUID',
        },
      ],
    },
  ],
];
