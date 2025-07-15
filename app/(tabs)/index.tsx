import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTasks } from '../../context/TasksContext';

// Colores e íconos para las categorías
const categoriesInfo = {
  Trabajo: { color: '#f39c12', icon: 'briefcase' },
  Estudios: { color: '#2980b9', icon: 'school' },
  Casa: { color: '#27ae60', icon: 'home' },
  Ejercicio: { color: '#e74c3c', icon: 'fitness' },
  Compras: { color: '#9b59b6', icon: 'cart' },
  Salud: { color: '#1abc9c', icon: 'heart' },
};

export default function CategoriesScreen() {
  const router = useRouter();
  const { tasks } = useTasks();

  // Calcula conteo de tareas por categoría
  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    // Inicializamos los contadores en 0
    Object.keys(categoriesInfo).forEach(cat => (counts[cat] = 0));
    // Contamos tareas por categoría
    tasks.forEach(task => {
      if (counts[task.category] !== undefined) {
        counts[task.category]++;
      }
    });
    // Construimos arreglo con info completa
    return Object.entries(categoriesInfo).map(([name, { color, icon }]) => ({
      id: name,
      name,
      color,
      icon,
      count: counts[name] || 0,
    }));
  }, [tasks]);

  const handlePress = (categoryName: string) => {
    router.push(`/category/${categoryName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks's Category</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => handlePress(item.name)}
          >
            <View style={styles.countContainer}>
              <Text style={styles.countText}>{item.count}</Text>
            </View>
            <Ionicons name={item.icon as any} size={32} color="#fff" />
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    flex: 0.48,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  countContainer: {
    position: 'absolute',
    top: 8,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
