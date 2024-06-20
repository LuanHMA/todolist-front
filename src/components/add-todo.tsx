"use client";

import { useTodos } from "@/context/todo-context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Loader } from "lucide-react";

export function AddTodo() {
  const { createTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const { toast } = useToast();

  const handleAddTodo = async () => {
    if (!title) {
      toast({
        variant: "destructive",
        title: "Ops, parece que o NADA não é considerado uma tarefa 😅",
        duration: 3000,
      });
      return;
    }

    setIsFetching(true);

    try {
      await createTodo({ title });

      setTitle("");
    } catch (error) {
      throw new Error("Erro ao adicionar tarefa", { cause: error });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleAddTodo();
      }}
    >
      <fieldset className="w-full flex items-center gap-x-2">
        <Input
          type="text"
          className="bg-neutral-900 border-neutral-700"
          placeholder="Adicione uma nova tarefa"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Button
          variant={"secondary"}
          type="submit"
          disabled={isFetching}
          className="disabled:pointer-events-none w-32"
        >
          {isFetching ? (
            <Loader size={22} className="animate-spin" />
          ) : (
            "Adicionar"
          )}
        </Button>
      </fieldset>
    </form>
  );
}
