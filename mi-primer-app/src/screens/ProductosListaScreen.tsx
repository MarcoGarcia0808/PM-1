import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { productos } from '@/src/data/productos';
import type { ProductosStackParamList } from '@/src/types/navigation';
import type { Producto } from '@/src/types/producto';

type Props = NativeStackScreenProps<ProductosStackParamList, 'ProductosLista'>;

export default function ProductosListaScreen({ navigation }: Props) {
  const renderProducto = ({ item }: { item: Producto }) => (
    <Pressable
      accessibilityRole="button"
      onPress={() => navigation.navigate('ProductoDetalle', { id: item.id })}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.cardHeader}>
        <ThemedText type="subtitle" style={styles.productName}>
          {item.nombre}
        </ThemedText>
        <ThemedText type="defaultSemiBold">${item.precio}</ThemedText>
      </View>
      <ThemedText style={styles.description}>{item.descripcion}</ThemedText>
      <ThemedText type="link">Ver detalle</ThemedText>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProducto}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    gap: 12,
    padding: 16,
  },
  card: {
    gap: 8,
    borderColor: '#d0d7de',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  productName: {
    flex: 1,
  },
  description: {
    color: '#57606a',
  },
});
