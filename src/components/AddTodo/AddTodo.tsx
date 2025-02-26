import React, { useState } from "react";
import { Input, Text } from "@mantine/core";
import { Button } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";
import { ITodoItemType } from "@/types/types";

interface IAddTodo {
  onCreate: Function;
}

const AddTodo: React.FC<IAddTodo> = ({ onCreate }) => {
  const [currentTodo, setCurrentTodo] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | Error>("");


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ITodoItemType>();
  //   const [currentTodo, setCurrentTodo] = useState<string>("");
  //   const [error, setError] = useState<boolean>(false);

  //   const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const {
  //       target: { value },
  //     } = event;
  //     if (error) setError(false);
  //     setCurrentTodo(value);
  //   };

  const onSubmit: SubmitHandler<ITodoItemType> = async (data) => {
    // if (!currentTodo) {
    //   setError(true);
    //   return;
    // }
    try {
      const resp = await fetch("/tasks", {
        method: "POST",
        body: JSON.stringify(data.title),
      });
      const todoResp = await resp.json();
      if (resp.status === 200) {
        onCreate();
        setValue("title", "");
        // setCurrentTodo("");
      } else {
        setApiError(todoResp.msg);
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 lg:w-1/3"
      >
        <div className="mt-6 flex justify-center w-full">
          <Input
            placeholder="Add A New Todo"
            // value={currentTodo}
            variant="filled"
            size="sm"
            //   onChange={handleTodoChange}
            className="flex-1 mr-3"
            // error={error}
            {...register("title", { required: true })}
          />
          <Button variant="filled" color="gray" type="submit">
            Submit
          </Button>
        </div>
        {errors.title && <Text c="red">This is a required field</Text>}
        {apiError && <Text c="red">{`${apiError}`}</Text>}
      </form>
    </>
  );
};

export default AddTodo;
