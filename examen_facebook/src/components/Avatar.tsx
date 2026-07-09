import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../constants/theme';

type AvatarProps = {
  name: string;
  size?: number;
};

export function Avatar({ name, size = 48 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: Math.max(14, size * 0.36) }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    letterSpacing: 0,
  },
});
