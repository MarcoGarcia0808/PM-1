import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Avatar } from '../components/Avatar';
import { colors, radius, spacing } from '../constants/theme';
import { clearChatMessages, getChatById } from '../database/chatRepository';
import type { Chat } from '../types/chat.types';
import type { RootStackParamList } from '../types/navigation.types';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'Profile'>['route'];

const options = [
  { icon: 'notifications-outline', label: 'Silenciar notificaciones' },
  { icon: 'image-outline', label: 'Archivos y multimedia' },
  { icon: 'lock-closed-outline', label: 'Privacidad del chat' },
] as const;

export function ProfileScreen() {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { chatId } = route.params;
  const [chat, setChat] = useState<Chat | null>(null);

  const loadChat = useCallback(async () => {
    const row = await getChatById(chatId);
    setChat(row ?? null);
  }, [chatId]);

  useEffect(() => {
    void loadChat();
  }, [loadChat]);

  function confirmClear() {
    Alert.alert(
      'Limpiar historial',
      'Se borraran los mensajes de este chat. Esta accion no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: () => {
            void (async () => {
              await clearChatMessages(chatId);
              await loadChat();
              navigation.goBack();
            })();
          },
        },
      ],
    );
  }

  if (!chat) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>No se encontro el chat.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <Avatar name={chat.contactName} size={96} />
          <Text style={styles.name}>{chat.contactName}</Text>
          <Text style={styles.phone}>{chat.phone}</Text>
          <Text style={styles.status}>{chat.status}</Text>
        </View>

        <View style={styles.section}>
          {options.map((item) => (
            <View key={item.label} style={styles.option}>
              <Ionicons color={colors.secondary} name={item.icon} size={22} />
              <Text style={styles.optionText}>{item.label}</Text>
            </View>
          ))}
        </View>

        <Pressable style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]} onPress={confirmClear}>
          <Ionicons color={colors.danger} name="trash-outline" size={22} />
          <Text style={styles.deleteText}>Limpiar mensajes del chat</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    backgroundColor: colors.screen,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.screen,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
  },
  deleteText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '700',
  },
  muted: {
    color: colors.muted,
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
    marginTop: spacing.md,
    textAlign: 'center',
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
  },
  optionText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  phone: {
    color: colors.muted,
    fontSize: 15,
    marginTop: spacing.xs,
  },
  pressed: {
    opacity: 0.75,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.xl,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginTop: spacing.lg,
  },
  status: {
    color: colors.secondary,
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
