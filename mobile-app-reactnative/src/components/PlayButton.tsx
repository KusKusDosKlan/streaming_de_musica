import React from 'react';
import {Text, Pressable} from 'react-native';

export function PlayButton({onPress}: {onPress?: () => void}) {
  return <Pressable accessibilityRole="button" onPress={onPress}><Text>Reproduzir</Text></Pressable>;
}
