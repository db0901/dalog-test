import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { todoService } from "../services/todoService";
import { Todo, TodoStatus } from "../types/todo";

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  searchTerm: string;
  filteredTodos: Todo[];
}

interface TodoActions {
  addTodo: (title: string) => Promise<void>;
  updateTodoStatus: (id: number, status: TodoStatus) => Promise<void>;
  updateTodoTitle: (id: number, title: string) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  setSearchTerm: (term: string) => void;
  clearError: () => void;
}

const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoActionsContext = createContext<TodoActions | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [todos, searchTerm]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const data = await todoService.getAllTodos();
      setTodos(data);
      setError(null);
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

  const updateTodoTitle = async (id: number, title: string) => {
    try {
      const updatedTodo = await todoService.updateTodo(id, { title });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError("Failed to update todo title");
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

  const clearError = () => setError(null);

  const actions = useMemo(
    () => ({
      addTodo,
      updateTodoStatus,
      updateTodoTitle,
      deleteTodo,
      setSearchTerm,
      clearError,
    }),
    []
  );

  return (
    <TodoStateContext.Provider
      value={{ todos, isLoading, error, searchTerm, filteredTodos }}
    >
      <TodoActionsContext.Provider value={actions}>
        {children}
      </TodoActionsContext.Provider>
    </TodoStateContext.Provider>
  );
}

export const useTodoState = () => {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("useTodoState must be used within a TodoProvider");
  }
  return context;
};

export const useTodoActions = () => {
  const context = useContext(TodoActionsContext);
  if (!context) {
    throw new Error("useTodoActions must be used within a TodoProvider");
  }
  return context;
};
