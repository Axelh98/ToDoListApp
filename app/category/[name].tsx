import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { TasksContext } from "../../context/TasksContext";

export default function CategoryTasks() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const context = useContext(TasksContext);
  const router = useRouter();
  if (!context) {
    throw new Error("TasksContext must be used within a TasksProvider");
  }
  const { tasks, deleteTask } = context;

  const filteredTasks = tasks.filter((task) => task.category === name);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks in "{name}"</Text>
      {filteredTasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks in this category.</Text>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.name}</Text>
              <Text style={styles.taskDueDate}>Due: {item.dueDate}</Text>
              <Text style={styles.taskFrequency}>
                Frequency: {item.repetition}
              </Text>

              <View style={styles.actions}>
                <Button
                  title="Edit"
                  onPress={() => router.push(`/edit/${item.id}`)}
                />

                <Button
                  title="🗑️ Eliminar"
                  color="red"
                  onPress={() => deleteTask(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  noTasks: { fontSize: 16, color: "#666" },
  taskCard: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  taskTitle: { fontSize: 18, fontWeight: "600" },
  taskDueDate: { fontSize: 14, color: "#333" },
  taskFrequency: { fontSize: 14, color: "#333" },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
