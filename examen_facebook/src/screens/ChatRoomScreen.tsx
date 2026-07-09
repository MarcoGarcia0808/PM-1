import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/EmptyState';
import { MessageBubble } from '../components/MessageBubble';
import { colors, radius, spacing } from '../constants/theme';
import {
  addMessage,
  getChatById,
  getMessages,
  markChatAsRead,
} from '../database/chatRepository';
import type { Chat, Message } from '../types/chat.types';
import type { RootStackParamList } from '../types/navigation.types';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'ChatRoom'>['route'];
type Navigation = NativeStackNavigationProp<RootStackParamList, 'ChatRoom'>;

export function ChatRoomScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation<Navigation>();
  const listRef = useRef<FlatList<Message>>(null);
  const { chatId } = route.params;

  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadRoom = useCallback(async () => {
    setLoading(true);
    const [chatRow, messageRows] = await Promise.all([getChatById(chatId), getMessages(chatId)]);
    await markChatAsRead(chatId);
    setChat(chatRow ?? null);
    setMessages(messageRows);
    setLoading(false);
  }, [chatId]);

  useEffect(() => {
    void loadRoom();
  }, [loadRoom]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: chat?.contactName ?? 'Chat',
      headerRight: () =>
        chat ? (
          <Pressable
            accessibilityLabel="Ver detalle del chat"
            style={styles.headerButton}
            onPress={() => navigation.navigate('Profile', { chatId })}
          >
            <Ionicons color={colors.white} name="information-circle-outline" size={26} />
          </Pressable>
        ) : null,
    });
  }, [chat, chatId, navigation]);

  useEffect(() => {
    if (messages.length > 0) {
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  }, [messages.length]);

  async function handleSend() {
    const text = messageText.trim();

    if (!text || sending) {
      return;
    }

    setSending(true);
    setMessageText('');

    const userMessage = await addMessage(chatId, text, 'me');
    setMessages((current) => [...current, userMessage]);

    setTimeout(() => {
      void (async () => {
        const autoReply = await addMessage(chatId, 'Mensaje recibido 👍', 'contact');
        await markChatAsRead(chatId);
        setMessages((current) => [...current, autoReply]);
        const updatedChat = await getChatById(chatId);
        setChat(updatedChat ?? null);
        setSending(false);
      })();
    }, 650);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.secondary} />
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      {chat ? (
        <View style={styles.contactBar}>
          <Avatar name={chat.contactName} size={38} />
          <View style={styles.contactText}>
            <Text numberOfLines={1} style={styles.contactName}>
              {chat.contactName}
            </Text>
            <Text numberOfLines={1} style={styles.contactStatus}>
              {chat.status}
            </Text>
          </View>
        </View>
      ) : null}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
        style={styles.keyboard}
      >
        <FlatList
          ref={listRef}
          contentContainerStyle={[styles.messages, messages.length === 0 && styles.emptyMessages]}
          data={messages}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <MessageBubble message={item} />}
          ListEmptyComponent={
            <EmptyState title="Sin mensajes" message="Escribe el primer mensaje de esta conversacion." />
          }
        />

        <View style={styles.composer}>
          <TextInput
            multiline
            placeholder="Mensaje"
            placeholderTextColor={colors.muted}
            style={styles.input}
            value={messageText}
            onChangeText={setMessageText}
          />
          <Pressable
            accessibilityLabel="Enviar mensaje"
            disabled={sending || messageText.trim().length === 0}
            style={({ pressed }) => [
              styles.sendButton,
              (pressed || sending) && styles.pressed,
              messageText.trim().length === 0 && styles.disabled,
            ]}
            onPress={() => void handleSend()}
          >
            <Ionicons color={colors.white} name="send" size={20} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    backgroundColor: colors.chatBackground,
    flex: 1,
    justifyContent: 'center',
  },
  composer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
  },
  contactBar: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.divider,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  contactName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  contactStatus: {
    color: colors.muted,
    fontSize: 12,
  },
  contactText: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.chatBackground,
    flex: 1,
  },
  disabled: {
    opacity: 0.45,
  },
  emptyMessages: {
    flexGrow: 1,
  },
  headerButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    color: colors.text,
    flex: 1,
    fontSize: 15,
    maxHeight: 110,
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  keyboard: {
    flex: 1,
  },
  messages: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: radius.pill,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
});
