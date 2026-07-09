import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../constants/theme';
import type { Contact } from '../types/chat.types';
import { Avatar } from './Avatar';

type ContactListItemProps = {
  contact: Contact;
  onPress: () => void;
};

export function ContactListItem({ contact, onPress }: ContactListItemProps) {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
      <Avatar name={contact.name} />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {contact.name}
        </Text>
        <Text numberOfLines={1} style={styles.status}>
          {contact.status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
  status: {
    color: colors.muted,
    fontSize: 14,
  },
});
