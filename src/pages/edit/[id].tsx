import Container from "@/components/Container/Container";
import { TodoItemType } from "@/types/types";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Textarea } from "@mantine/core";

const EditTodo = () => {
  const router = useRouter();
  const id = router.query.id;

  const [error, setError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");
  const [currentTodo, setCurrentTodo] = useState<TodoItemType>({
    id: 0,
    title: "",
  });

  const getTodoData = async () => {
    try {
      const list = await fetch(`/tasks/${id}`, {
        method: "GET",
      });
      const todoData = await list.json();
      setCurrentTodo(todoData);
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const handleEdit = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event;
    setCurrentTodo({
      ...currentTodo,
      title: value,
    });
  };

  const onUpdate = async () => {
    try {
      if (!currentTodo.title) {
        setError(true);
        return;
      }
      const resp = await fetch(`/tasks/${currentTodo.id}`, {
        method: "PUT",
        body: JSON.stringify(currentTodo.title),
      });
      const data = await resp.json();
      console.log("data", data);
      if (resp.status === 200) {
        router.back();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

  return (
    <Container>
      <Textarea
        label="Edit Todo"
        description="Update/Change your todo and then hit save to save all the changes"
        placeholder="Input placeholder"
        className="w-full md:w-1/2 lg:w-1/3"
        value={currentTodo.title}
        onChange={handleEdit}
      />
      <Button
        variant="filled"
        color="gray"
        onClick={onUpdate}
        className="mt-4"
        disabled={!currentTodo.title}
      >
        Update
      </Button>
    </Container>
  );
};

export default EditTodo;
