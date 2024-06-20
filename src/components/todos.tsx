"use client";

import { useTodos } from "@/context/todo-context";
import { RemoveTodo } from "./remove-todo";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { UpdateTodoTitle } from "./update-todo-title";

export function Todos() {
  const { todos, updateTodo } = useTodos();
  const [isFetching, setIsFetching] = useState(false);

  const toggleTodoStatus = async (todoId: number, currentStatus: number) => {
    setIsFetching(true);
    try {
      await updateTodo({
        id: todoId,
        checked: currentStatus === 1 ? 0 : 1,
      });
    } catch (error) {
      throw new Error("Erro ao atualizar tarefa", { cause: error });
    } finally {
      setIsFetching(false);
    }
  };

  const hasCompletedTodos = todos.some((todo) => todo.checked === 1);

  return (
    <div className="py-4 block space-y-4">
      {todos.length === 0 ? (
        <h1 className="pb-6 pt-2 text-white text-sm">
          Nenhuma tarefa encontrada, que tal criar uma?
        </h1>
      ) : (
        <>
          <div className="flex flex-col gap-y-4">
            {todos.map((todo) => {
              if (todo.checked === 0) {
                return (
                  <div
                    key={todo.id}
                    className="flex flex-nowrap items-center gap-x-2 bg-neutral-900 rounded-lg p-3 h-16 animate-todo-created"
                  >
                    <div
                      className={`flex items-center gap-x-3 flex-1 ${
                        isFetching && "animate-pulse"
                      }`}
                    >
                      <Checkbox
                        id={String(todo.id)}
                        onCheckedChange={() =>
                          toggleTodoStatus(todo.id, todo.checked)
                        }
                      />
                      <label
                        htmlFor={String(todo.id)}
                        className="cursor-pointer text-sm text-white"
                      >
                        {todo.title}
                      </label>
                    </div>
                    <UpdateTodoTitle id={todo.id} currentTitle={todo.title} />
                    <RemoveTodo id={todo.id} />
                  </div>
                );
              }
              return null; // Ensure each branch returns a value or null
            })}
          </div>

          {hasCompletedTodos && (
            <div className="space-y-2">
              <h1 className="text-sm text-white">Tarefas concluídas:</h1>

              <div className="flex flex-col gap-y-4">
                {todos.map((todo) => {
                  if (todo.checked === 1) {
                    return (
                      <div
                        key={todo.id}
                        className="flex flex-nowrap items-center gap-x-2 bg-neutral-900 rounded-lg p-3 h-16 animate-todo-created"
                      >
                        <div
                          className={`flex items-center gap-x-3 flex-1 ${
                            isFetching && "animate-pulse"
                          }`}
                        >
                          <Checkbox
                            id={String(todo.id)}
                            checked={todo.checked === 1}
                            onCheckedChange={() =>
                              toggleTodoStatus(todo.id, todo.checked)
                            }
                          />
                          <label
                            htmlFor={String(todo.id)}
                            className="cursor-pointer text-sm line-through text-neutral-500"
                          >
                            {todo.title}
                          </label>
                        </div>
                        <RemoveTodo id={todo.id} />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
