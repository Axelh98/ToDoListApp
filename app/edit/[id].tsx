import { Picker } from '@react-native-picker/picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import {
  Button, StyleSheet,
  Text, TextInput,
  View
} from 'react-native';
import { TasksContext } from '../../context/TasksContext';

export default function EditTask() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { tasks, editTask } = useContext(TasksContext)!;
  const task = tasks.find(t => t.id === id);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [repetition, setRepetition] = useState<'Daily' | 'Weekly' | 'Monthly' | 'None'>('None');

  useEffect(() => {
    if (task) {
      setTitle(task.name);
      setCategory(task.category);
      setRepetition(task.repetition);
    }
  }, [task]);

  const handleEdit = () => {
    if (!task) return;
    editTask({
      ...task,
      name: title,
      category,
      repetition,
    });
    router.back();
  };

  if (!task) return <Text style={{ padding: 20 }}>Tarea no encontrada</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Editar Tarea</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Picker selectedValue={category} onValueChange={setCategory}>
        <Picker.Item label="Work" value="Work" />
        <Picker.Item label="Study" value="Study" />
        <Picker.Item label="Home" value="Home" />
        <Picker.Item label="Exercise" value="Exercise" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Health" value="Health" />
      </Picker>
      <Picker selectedValue={repetition} onValueChange={setRepetition}>
        <Picker.Item label="None" value="None" />
        <Picker.Item label="Daily" value="Daily" />
        <Picker.Item label="Weekly" value="Weekly" />
        <Picker.Item label="Monthly" value="Monthly" />
      </Picker>
      <Button title="Save Changes" onPress={handleEdit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5,
  },
});
