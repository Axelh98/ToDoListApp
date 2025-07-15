// context/TasksContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// 1. Tipo de tarea
export type Task = {
  id: string;
  name: string;
  category: string;
  dueDate: string;
  repetition: 'Diaria' | 'Semanal' | 'Mensual' | 'Ninguna';
};

// 2. Tipo del contexto
export type TasksContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
};

const STORAGE_KEY = '@mytasks';

// 3. Crear el contexto
export const TasksContext = createContext<TasksContextType | undefined>(undefined);

// 4. Props del Provider
type TasksProviderProps = {
  children: ReactNode;
};

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Cargar tareas desde AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (e) {
        console.error('Failed to load tasks', e);
      }
    };
    loadTasks();
  }, []);

  // Guardar tareas en AsyncStorage cada vez que cambian
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        console.error('Failed to save tasks', e);
      }
    };
    saveTasks();
  }, [tasks]);

  // Crear
  const addTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

  // Editar
  const editTask = (updatedTask: Task) => {
    setTasks(prev =>
      prev.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Eliminar
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask, editTask, deleteTask }}>
      {children}
    </TasksContext.Provider>
  );
};

// 5. Hook personalizado
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};
