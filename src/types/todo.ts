export type TodoStatus = "Todo" | "Doing" | "Done";

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}
