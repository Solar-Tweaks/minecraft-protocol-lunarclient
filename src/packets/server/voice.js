module.exports = [
  'container',
  [
    {
      name: 'senders',
      type: [
        'array',
        {
          countType: 'varint',
          type: 'UUID',
        },
      ],
    },
    {
      name: 'blob',
      type: 'ByteArray',
    },
  ],
];
