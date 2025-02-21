import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TodoFormType } from "@/types/types";
import { useRouter } from "next/router";
import TodoForm from "@/components/TodoForm.tsx/TodoForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import * as yup from "yup";
import { createTodo } from "@/services/queries";

const schema = yup
  .object({
    title: yup.string().required("Title is requried for a proper Todo"),
  })
  .required();

const NewTodo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<TodoFormType>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
      router.back();
      setValue("title", "");
    },
    onError: () => {
      setError("title", { type: "manual", message: "Something went wrong" });
    },
  });

  const onSubmit: SubmitHandler<TodoFormType> = (data) => {
    createTodoMutation.mutate(data);
  };

  return (
    <TodoForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
    />
  );
};

export default NewTodo;
