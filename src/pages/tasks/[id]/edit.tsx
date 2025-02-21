import Container from "@/components/Container/Container";
import { TodoItemType } from "@/types/types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TodoForm from "@/components/TodoForm.tsx/TodoForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as yup from "yup";
import { getTodoById, updateTodoData } from "@/services/queries";
import { Loader, Center } from "@mantine/core";

const schema = yup
  .object({
    id: yup
      .number()
      .required("ID is requried, without ID the todo can't be updated"),
    title: yup.string().required("Title is requried for a proper Todo"),
  })
  .required();

const EditTodo = () => {
  const router = useRouter();
  const id = router.query.id;

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<TodoItemType>({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const {
    data: todoData,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["todo"],
    queryFn: () => getTodoById(parseInt(id)),
  });

  useEffect(() => {
    if (todoData) {
      setValue("id", todoData.id);
      setValue("title", todoData.title);
    }
  }, [todoData]);

  const updateTodoMutation = useMutation({
    mutationFn: updateTodoData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      router.back();
    },
    onError: () => {
      setError("title", { type: "manual", message: "Something went wrong" });
    },
  });
  // Replace this with react query mutation
  const onUpdate: SubmitHandler<TodoItemType> = async (todoData) => {
    console.log("todoData", todoData);
    updateTodoMutation.mutate(todoData);
  };

  if (isFetching) {
    return (
      <Center className="h-screen">
        <Loader />
      </Center>
    );
  }

  if (error) {
    setError("title", { type: "manual", message: "Something went wrong" });
  }

  return (
    <TodoForm
      onSubmit={handleSubmit(onUpdate)}
      register={register}
      errors={errors}
      isEdit={true}
    />
  );
};

export default EditTodo;
