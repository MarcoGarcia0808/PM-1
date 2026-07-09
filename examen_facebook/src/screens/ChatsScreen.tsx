import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatListItem } from '../components/ChatListItem';
import { EmptyState } from '../components/EmptyState';
import { SearchBox } from '../components/SearchBox';
import { colors, radius, spacing } from '../constants/theme';
import { getChats, initializeChatData } from '../database/chatRepository';
import type { Chat } from '../types/chat.types';
import type { MainTabParamList, RootStackParamList } from '../types/navigation.types';

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Chats'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function ChatsScreen() {
  const navigation = useNavigation<Navigation>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const loadChats = useCallback(async () => {
    setLoading(true);
    await initializeChatData();
    const rows = await getChats(searchTerm);
    setChats(rows);
    setLoading(false);
  }, [searchTerm]);

  useFocusEffect(
    useCallback(() => {
      void loadChats();
    }, [loadChats]),
  );

  const totalUnread = useMemo(
    () => chats.reduce((total, chat) => total + chat.unreadCount, 0),
    [chats],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ChatUPQ</Text>
          <Text style={styles.subtitle}>{totalUnread > 0 ? `${totalUnread} mensajes sin leer` : 'Mensajeria movil'}</Text>
        </View>
        <Pressable
          accessibilityLabel="Crear nuevo chat"
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          onPress={() => navigation.navigate('Contacts')}
        >
          <Ionicons color={colors.primary} name="create" size={22} />
        </Pressable>
      </View>

      <SearchBox placeholder="Buscar chats o mensajes" value={searchTerm} onChangeText={setSearchTerm} />

      {loading ? (
        <ActivityIndicator color={colors.secondary} style={styles.loader} />
      ) : (
        <FlatList
          contentContainerStyle={chats.length === 0 ? styles.emptyList : undefined}
          data={chats}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ChatListItem chat={item} onPress={() => navigation.navigate('ChatRoom', { chatId: item.id })} />
          )}
          ListEmptyComponent={
            <EmptyState title="Sin conversaciones" message="Busca un contacto y empieza un nuevo chat." />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
  },
  emptyList: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  loader: {
    marginTop: spacing.xl,
  },
  pressed: {
    opacity: 0.75,
  },
  subtitle: {
    color: '#DCEFEB',
    fontSize: 13,
    marginTop: spacing.xs,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
});
