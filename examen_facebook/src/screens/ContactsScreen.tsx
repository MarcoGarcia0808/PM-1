import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContactListItem } from '../components/ContactListItem';
import { EmptyState } from '../components/EmptyState';
import { SearchBox } from '../components/SearchBox';
import { colors, spacing } from '../constants/theme';
import { getContacts, initializeChatData, openOrCreateChat } from '../database/chatRepository';
import type { Contact } from '../types/chat.types';
import type { MainTabParamList, RootStackParamList } from '../types/navigation.types';

type Navigation = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Contacts'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function ContactsScreen() {
  const navigation = useNavigation<Navigation>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    await initializeChatData();
    const rows = await getContacts(searchTerm);
    setContacts(rows);
    setLoading(false);
  }, [searchTerm]);

  useFocusEffect(
    useCallback(() => {
      void loadContacts();
    }, [loadContacts]),
  );

  async function handleContactPress(contactId: number) {
    const chatId = await openOrCreateChat(contactId);
    navigation.navigate('ChatRoom', { chatId });
  }

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nuevo chat</Text>
        <Text style={styles.subtitle}>Selecciona un contacto para conversar</Text>
      </View>

      <SearchBox placeholder="Buscar contactos" value={searchTerm} onChangeText={setSearchTerm} />

      {loading ? (
        <ActivityIndicator color={colors.secondary} style={styles.loader} />
      ) : (
        <FlatList
          contentContainerStyle={contacts.length === 0 ? styles.emptyList : undefined}
          data={contacts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <ContactListItem contact={item} onPress={() => void handleContactPress(item.id)} />
          )}
          ListEmptyComponent={
            <EmptyState title="Sin contactos" message="No hay contactos que coincidan con la busqueda." />
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
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  loader: {
    marginTop: spacing.xl,
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
