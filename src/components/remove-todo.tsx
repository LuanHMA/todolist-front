"use client";

import { useTodos } from "@/context/todo-context";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { toast } from "./ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

export function RemoveTodo({ id }: { id: number }) {
  const { removeTodo } = useTodos();

  const handleTodoRemove = async () => {
    try {
      toast({
        title: "Excluir tarefa",
        description: "Tem certeza que deseja excluir essa Tarefa?",
        variant: "destructive",
        action: (
          <ToastAction
            altText="Tem certeza que deseja excluir essa Tarefa?"
            className="border p-2 rounded-lg"
            onClick={async () => await removeTodo({ id })}
          >
            Excluir
          </ToastAction>
        ),
      });
    } catch (error) {
      throw new Error("Erro ao remover tarefa", { cause: error });
    }
  };

  return (
    <Button
      aria-label="Deletar"
      className="transition-colors duration-300 p-2 hover:bg-neutral-800"
      onClick={handleTodoRemove}
    >
      <Trash />
    </Button>
  );
}
