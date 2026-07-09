import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing } from '../constants/theme';

const settings = [
  { icon: 'person-circle-outline', title: 'Cuenta', detail: 'Perfil academico UPQ' },
  { icon: 'notifications-outline', title: 'Notificaciones', detail: 'Mensajes y sonidos activos' },
  { icon: 'lock-closed-outline', title: 'Privacidad', detail: 'Opciones visuales de seguridad' },
  { icon: 'server-outline', title: 'Almacenamiento', detail: 'Mensajes guardados en SQLite' },
] as const;

export function SettingsScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ajustes</Text>
        <Text style={styles.subtitle}>ChatUPQ para Programacion Movil</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {settings.map((item) => (
          <View key={item.title} style={styles.row}>
            <View style={styles.icon}>
              <Ionicons color={colors.secondary} name={item.icon} size={24} />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowDetail}>{item.detail}</Text>
            </View>
            <Ionicons color={colors.muted} name="chevron-forward" size={20} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.screen,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: '#E8F4F2',
    borderRadius: radius.pill,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  rowDetail: {
    color: colors.muted,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: '#DCEFEB',
    fontSize: 13,
    marginTop: spacing.xs,
  },
  textContent: {
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
  },
});
