"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader, SquarePen } from "lucide-react";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useTodos } from "@/context/todo-context";

export function UpdateTodoTitle({
  id,
  currentTitle,
}: {
  id: number;
  currentTitle: string;
}) {
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { updateTodoTitle } = useTodos();

  const handleUpdateTodoTitle = async () => {
    if (!newTitle) {
      toast({
        title: "Parece que você esqueceu de digitar o título da sua tarefa!",
        variant: "destructive",
      });

      return;
    }

    setIsFetching(true);
    try {
      await updateTodoTitle({
        id,
        newTitle,
      });

      toast({
        title: "O título alterado com sucesso!",
        duration: 2000,
      });
      setModalIsOpen(false);
    } catch (error) {
      throw new Error("Erro ao atualizar nome da tarefa", { cause: error });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Dialog open={modalIsOpen}>
      <DialogTrigger>
        <Button
          className="transition-colors duration-300 p-2 hover:bg-neutral-800"
          aria-label="Editar"
          onClick={() => setModalIsOpen(true)}
        >
          <SquarePen />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-neutral-900 border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-white">Editar tarefa</DialogTitle>
          <DialogDescription>Edite o título da sua tarefa</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleUpdateTodoTitle();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-y-4">
              <Label htmlFor="name" className="text-left text-white">
                Novo título
              </Label>
              <Input
                id="name"
                className="bg-neutral-900 border-neutral-700 text-white"
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant={"default"}
              onClick={() => setModalIsOpen(false)}
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              variant={"secondary"}
              className="disabled:pointer-events-none"
              disabled={isFetching}
            >
              {isFetching ? (
                <Loader size={22} className="animate-spin" />
              ) : (
                "Salvar"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
