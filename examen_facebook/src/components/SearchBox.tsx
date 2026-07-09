import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';

import { colors, radius, spacing } from '../constants/theme';

type SearchBoxProps = {
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
};

export function SearchBox({ value, placeholder, onChangeText }: SearchBoxProps) {
  return (
    <View style={styles.container}>
      <Ionicons color={colors.muted} name="search" size={20} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    margin: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  input: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    height: 44,
  },
});
