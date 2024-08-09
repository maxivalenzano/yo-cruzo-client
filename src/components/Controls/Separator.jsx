import React from 'react';
import { View } from 'react-native';

const defaultStyle = { width: '100%', height: 1, backgroundColor: '#EBEBEB' };

function Separator({ style }) {
  const currentStyle = style ?? {};
  return <View style={{ ...defaultStyle, ...currentStyle }} />;
}

export default Separator;
