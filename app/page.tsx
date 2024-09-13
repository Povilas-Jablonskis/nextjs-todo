"use client";

import { ChangeEvent, useState } from "react";

import ListItem from "./_components/ListItem";
import { Todo } from "./types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [input, setInput] = useState<string>("");

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  function AddTodo() {
    const id = Math.max(...todos.map((x) => x.id), 0) + 1;

    if (input) {
      setTodos((array) => [...array, { id, name: input }]);
      setInput("");
    }
  }

  function EditTodo() {
    if (input) {
      setTodos((array) => array.map((x) => (x.id !== editIndex ? x : { ...x, name: input })));
      setInput("");
      setEditIndex(null);
    }
  }

  function onDelete(id: number) {
    setTodos((array) => array.filter((x) => x.id !== id));
  }

  function onEdit(id: number) {
    const selectedTodo = todos.find((x) => x.id === id);

    if (selectedTodo) {
      setEditIndex(id);
      setInput(selectedTodo.name);
    }
  }

  return (
    <main className="grid py-2 px-5">
      <div className="flex flex-col m-auto w-full">
        <div className="text-xl m-auto mb-3">TODO LIST</div>
        <div className="flex mb-4">
          <input
            value={input}
            onChange={onChange}
            className="text-xl p-1 me-1 border rounded flex-auto"
            placeholder={editIndex !== null ? "Edit item..." : "Add item..."}
          />
          <button
            className="bg-green-500 text-xl px-4 py-2 border-none text-white rounded-xl"
            onClick={editIndex != null ? EditTodo : AddTodo}
            disabled={!input}
          >
            {editIndex != null ? "Update" : "Add"}
          </button>
        </div>
      </div>

      <div className="flex flex-col px-3 py-4 bg-slate-50">
        {todos.length > 0 ? (
          todos.map((item) => (
            <ListItem key={item.id} item={item} onDelete={onDelete} onEdit={onEdit} />
          ))
        ) : (
          <div className="m-auto">NO ITEMS</div>
        )}
      </div>
    </main>
  );
}
