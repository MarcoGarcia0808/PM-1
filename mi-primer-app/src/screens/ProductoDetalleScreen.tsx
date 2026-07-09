import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { productos } from '@/src/data/productos';
import type { ProductosStackParamList } from '@/src/types/navigation';

type Props = NativeStackScreenProps<ProductosStackParamList, 'ProductoDetalle'>;

export default function ProductoDetalleScreen({ route }: Props) {
  const { id } = route.params;
  const producto = productos.find((item) => item.id === id);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.detailBox}>
        <ThemedText type="title">{producto?.nombre ?? 'Producto no encontrado'}</ThemedText>
        <ThemedText style={styles.description}>
          {producto?.descripcion ?? 'No existe informacion para el producto solicitado.'}
        </ThemedText>
        <ThemedText type="subtitle">
          Precio: {producto ? `$${producto.precio}` : 'Sin dato disponible'}
        </ThemedText>
        <ThemedText type="defaultSemiBold">ID recibido: {id}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  detailBox: {
    gap: 16,
    borderColor: '#d0d7de',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  description: {
    color: '#57606a',
  },
});
