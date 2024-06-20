import { AddTodo } from "@/components/add-todo";
import { Todos } from "@/components/todos";

export default function App() {
  return (
    <div className="min-h-screen p-20 bg-neutral-950 text-white ">
      <div className="w-full max-w-md mx-auto border border-neutral-700 p-4 pb-0 rounded-lg space-y-4">
        <h1 className="text-2xl font-semibold">Lista de tarefas</h1>

        <AddTodo />

        <Todos />
      </div>
    </div>
  );
}
