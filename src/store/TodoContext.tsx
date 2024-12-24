import { createContext, useContext, useEffect, useState } from "react";
import { todoService } from "../services/todoService";
import { Todo, TodoStatus } from "../types/todo";

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (title: string) => Promise<void>;
  updateTodoStatus: (id: number, status: TodoStatus) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos");
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const newTodo = await todoService.createTodo({
        title,
        status: "Todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setTodos((prev) => [...prev, newTodo]);
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const updateTodoStatus = async (id: number, status: TodoStatus) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { status });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        isLoading,
        error,
        addTodo,
        updateTodoStatus,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
