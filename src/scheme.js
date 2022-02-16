const scheme = [
  'container',
  [
    {
      name: 'id',
      type: ['mapper', require('./packets/mapper')],
    },
    {
      anon: true,
      type: [
        'switch',
        {
          compareTo: 'id',
          fields: {
            /* Server */
            client_voice: require('./packets/server/client_voice'),
            voice_channel_switch: require('./packets/server/voice_channel_switch'),
            voice_mute: require('./packets/server/voice_mute'),
            voice: require('./packets/server/voice'),
            voice_channel: require('./packets/server/voice_channel'),
            voice_channel_remove: require('./packets/server/voice_channel_remove'),
            voice_channel_update: require('./packets/server/voice_channel_update'),
            /* Client */
            cooldown: require('./packets/client/cooldown'),
            hologram: require('./packets/client/hologram'),
            hologram_update: require('./packets/client/hologram_update'),
            hologram_remove: require('./packets/client/hologram_remove'),
            nametags_override: require('./packets/client/nametags_override'),
            nametags_update: require('./packets/client/nametags_update'),
            notification: require('./packets/client/notification'),
            server_rule: require('./packets/client/server_rule'),
            server_update: require('./packets/client/server_update'),
            staff_mods: require('./packets/client/staff_mods'),
            teammates: require('./packets/client/teammates'),
            title: require('./packets/client/title'),
            update_world: require('./packets/client/update_world'),
            world_border: require('./packets/client/world_border'),
            world_border_remove: require('./packets/client/world_border_remove'),
            world_border_update: require('./packets/client/world_border_update'),
            ghost: require('./packets/client/ghost'),
            boss_bar: require('./packets/client/boss_bar'),
            world_border_create_new: require('./packets/client/world_border_create_new'),
            world_border_update_new: require('./packets/client/world_border_update_new'),
            mod_settings: require('./packets/client/mod_settings'),
            /* Shared */
            emote_broadcast: require('./packets/shared/emote_broadcast'),
            waypoint_add: require('./packets/shared/waypoint_add'),
            waypoint_remove: require('./packets/shared/waypoint_remove'),
          },
          default: 'void',
        },
      ],
    },
  ],
];

module.exports = scheme;
