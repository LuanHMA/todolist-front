"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Todo {
  title: string;
  checked: number;
  id: number;
}

interface TodoContextType {
  todos: Todo[];
  getTodos: () => Promise<void>;
  removeTodo: ({ id }: { id: number }) => Promise<void>;

  updateTodo: ({
    checked,
    id,
  }: {
    checked: number;
    id: number;
  }) => Promise<void>;
  updateTodoTitle: ({
    newTitle,
    id,
  }: {
    newTitle: string;
    id: number;
  }) => Promise<void>;
  createTodo: ({ title }: { title: string }) => Promise<void>;
}

const TodoContext = createContext({} as TodoContextType);

export function TodoContextProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const request = await fetch("http://localhost:3333/get-todos");
      const todos = await request.json();

      setTodos(todos);
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Houve um erro ao recuperar as tarefas!",
      });
    }
  };

  const createTodo = async ({ title }: { title: string }) => {
    try {
      await fetch("http://localhost:3333/add-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      await getTodos();
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Houve um erro ao adicionar sua tarefa!",
      });
    }
  };

  const removeTodo = async ({ id }: { id: number }) => {
    try {
      await fetch("http://localhost:3333/remove-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      await getTodos();
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Houve um erro ao atualizar sua tarefa!",
      });
    }
  };

  const updateTodo = async ({
    checked,
    id,
  }: {
    checked: number;
    id: number;
  }) => {
    try {
      await fetch("http://localhost:3333/update-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, checked }),
      });

      await getTodos();
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Houve um erro ao atualizar sua tarefa!",
      });
    }
  };

  const updateTodoTitle = async ({
    newTitle,
    id,
  }: {
    newTitle: string;
    id: number;
  }) => {
    try {
      await fetch("http://localhost:3333/update-todo/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, newTitle }),
      });

      await getTodos();
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        title: "Houve um erro ao atualizar o título da sua tarefa!",
      });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        getTodos,
        createTodo,
        removeTodo,
        updateTodo,
        todos,
        updateTodoTitle,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  if (!TodoContext) {
    throw new Error("Erro ao configurar o contexto");
  }
  return useContext(TodoContext);
}
