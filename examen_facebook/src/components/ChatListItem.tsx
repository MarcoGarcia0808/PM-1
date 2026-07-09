import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';
import { formatChatTime } from '../utils/date';
import type { Chat } from '../types/chat.types';
import { Avatar } from './Avatar';

type ChatListItemProps = {
  chat: Chat;
  onPress: () => void;
};

export function ChatListItem({ chat, onPress }: ChatListItemProps) {
  return (
    <Pressable style={({ pressed }) => [styles.container, pressed && styles.pressed]} onPress={onPress}>
      <Avatar name={chat.contactName} />

      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {chat.contactName}
          </Text>
          <Text style={styles.time}>{formatChatTime(chat.lastMessageAt)}</Text>
        </View>

        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.message}>
            {chat.lastMessage}
          </Text>
          {chat.unreadCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{chat.unreadCount}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: radius.pill,
    height: 22,
    justifyContent: 'center',
    minWidth: 22,
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
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
  message: {
    color: colors.muted,
    flex: 1,
    fontSize: 14,
  },
  name: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
  },
  time: {
    color: colors.muted,
    fontSize: 12,
  },
});
