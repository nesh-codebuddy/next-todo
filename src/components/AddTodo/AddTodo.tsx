import React, { useState } from "react";
import { Input, Text } from "@mantine/core";
import { Button } from "@mantine/core";

interface IAddTodo {
  onCreate: Function;
}

const AddTodo: React.FC<IAddTodo> = ({ onCreate }) => {
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | Error>("");

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (error) setError(false);
    setCurrentTodo(value);
  };

  const onSubmit = async () => {
    if (!currentTodo) {
      setError(true);
      return;
    }
    try {
      const resp = await fetch("/tasks", {
        method: "POST",
        body: JSON.stringify(currentTodo),
      });
      if (resp.status === 200) {
        onCreate();
        setCurrentTodo("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      }
    }
  };

  return (
    <>
      <div className="mt-6 flex justify-center w-full md:w-1/2 lg:w-1/3">
        <Input
          placeholder="Add A New Todo"
          value={currentTodo}
          variant="filled"
          size="sm"
          onChange={handleTodoChange}
          className="flex-1 mr-3"
          error={error}
        />
        <Button variant="filled" color="gray" onClick={onSubmit}>
          Submit
        </Button>
      </div>
      {apiError && <Text c="red">{apiError}</Text>}
    </>
  );
};

export default AddTodo;
