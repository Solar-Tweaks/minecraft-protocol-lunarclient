module.exports = (color) => {
  const _color = color.startsWith('#') ? color.substring(1) : color;
  return parseInt(`0x${_color}`);
};
