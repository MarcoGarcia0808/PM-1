import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';
import { formatChatTime } from '../utils/date';
import type { Message } from '../types/chat.types';

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isMine = message.sender === 'me';

  return (
    <View style={[styles.wrapper, isMine ? styles.mineWrapper : styles.theirWrapper]}>
      <View style={[styles.bubble, isMine ? styles.mineBubble : styles.theirBubble]}>
        <Text style={styles.text}>{message.text}</Text>
        <Text style={styles.time}>{formatChatTime(message.createdAt)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: radius.md,
    maxWidth: '82%',
    minWidth: 74,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  mineBubble: {
    backgroundColor: colors.sentBubble,
  },
  mineWrapper: {
    justifyContent: 'flex-end',
  },
  text: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
  },
  theirBubble: {
    backgroundColor: colors.white,
  },
  theirWrapper: {
    justifyContent: 'flex-start',
  },
  time: {
    alignSelf: 'flex-end',
    color: colors.muted,
    fontSize: 11,
    marginTop: spacing.xs,
  },
  wrapper: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
});
