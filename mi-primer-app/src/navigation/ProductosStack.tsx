import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductoDetalleScreen from '@/src/screens/ProductoDetalleScreen';
import ProductosListaScreen from '@/src/screens/ProductosListaScreen';
import { productos } from '@/src/data/productos';
import type { ProductosStackParamList } from '@/src/types/navigation';

const Stack = createNativeStackNavigator<ProductosStackParamList>();

export default function ProductosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ProductosListaScreen}
        name="ProductosLista"
        options={{ title: 'Productos' }}
      />
      <Stack.Screen
        component={ProductoDetalleScreen}
        name="ProductoDetalle"
        options={({ route }) => {
          const producto = productos.find((item) => item.id === route.params.id);

          return {
            title: producto?.nombre ?? `Detalle #${route.params.id}`,
          };
        }}
      />
    </Stack.Navigator>
  );
}
