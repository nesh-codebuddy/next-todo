import React from "react";
import { Text } from "@mantine/core";
import styles from "./ListTodo.module.css";
import { Button } from "@mantine/core";
import { TodoItemType } from "../../types/types";

interface ListTodo {
  todo: TodoItemType;
  deleteTodo: React.MouseEventHandler<HTMLButtonElement>;
  editTodo: React.MouseEventHandler<HTMLButtonElement>;
}

const ListTodo = (props: ListTodo) => {
  const { todo, deleteTodo, editTodo } = props;
  return (
    <div
      className="flex flex-row sm:flex-col mt-4 w-full border-2 p-2 rounded-lg border-gray-700 hover:border-gray-400"
      key={todo.id}
    >
      <Text size="lg" className="flex-1  !mr-3 sm:!mb-3 !leading-tight">
        {todo.title}
      </Text>

      <div className="flex gap-2">
        <Button
          variant="filled"
          color="violet"
          onClick={editTodo}
          className="sm:!w-2/4"
        >
          Edit
        </Button>
        <Button
          variant="filled"
          color="red"
          onClick={deleteTodo}
          className="sm:!w-2/4"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ListTodo;
