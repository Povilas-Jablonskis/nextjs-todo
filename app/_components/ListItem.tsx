"use client";

import { Todo } from "../types";

interface Props {
  item: Todo;
  onDelete(id: number): void;
  onEdit(id: number): void;
}

export default function ListItem({ item, onDelete, onEdit }: Props) {
  return (
    <div className="flex pb-2">
      <span className="content-center">{item.name}</span>
      <span className="ms-auto">
        <button
          className="px-3 py-2 bg-red-600 text-white border-none rounded-lg me-2"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
        <button
          className="px-3 py-2 bg-sky-500 text-white border-none rounded-lg"
          onClick={() => onEdit(item.id)}
        >
          Edit
        </button>
      </span>
    </div>
  );
}
