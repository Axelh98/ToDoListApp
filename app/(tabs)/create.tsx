import { Picker } from "@react-native-picker/picker";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Task, TasksContext } from "../../context/TasksContext";

const categories = ["Trabajo", "Casa", "Estudios", "Ejercicio", "Compras"];
const frequencies = ["Diaria", "Semanal", "Mensual"];

export default function CreateTaskScreen() {
  const { addTask } = useContext(TasksContext)!;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [dueDate, setDueDate] = useState("");
  const [frequency, setFrequency] = useState(frequencies[0]);

  const handleAddTask = () => {
    if (!title || !dueDate) {
      alert("Please complete all required fields.");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      name: title,
      category,
      dueDate,
      repetition: frequency as "Diaria" | "Semanal" | "Mensual",
    };

    addTask(newTask);

    // Reset form
    setTitle("");
    setCategory(categories[0]);
    setDueDate("");
    setFrequency(frequencies[0]);

    alert("Task added successfully!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Task Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />

      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        {categories.map((cat) => (
          <Picker.Item label={cat} value={cat} key={cat} />
        ))}
      </Picker>

      <Text style={styles.label}>Due Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="2025-07-08"
      />

      <Text style={styles.label}>Frequency:</Text>
      <Picker
        selectedValue={frequency}
        onValueChange={(itemValue) => setFrequency(itemValue)}
        style={styles.picker}
      >
        {frequencies.map((freq) => (
          <Picker.Item label={freq} value={freq} key={freq} />
        ))}
      </Picker>

      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  label: { fontSize: 16, marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 5,
  },
  
  picker: {
    marginTop: 5,
  },
});
