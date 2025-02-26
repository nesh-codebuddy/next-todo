import Container from "@/components/Container/Container";
import { ITodoItemType } from "@/types/types";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TodoForm from "@/components/TodoForm.tsx/TodoForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    getFieldState,
    formState: { errors },
  } = useForm<ITodoItemType>({
    resolver: yupResolver(schema),
  });

  const getTodoData = async () => {
    try {
      const list = await fetch(`/tasks/${id}`, {
        method: "GET",
      });
      if (list.status === 200) {
        const todoData = await list.json();
        setValue("id", todoData.id);
        setValue("title", todoData.title);
      } else {
        setError("title", { type: "manual", message: "Something went wrong" });
      }
    } catch (error) {
      setError("title", { type: "manual", message: "Something went wrong" });
    }
  };

  const onUpdate: SubmitHandler<ITodoItemType> = async (todoData) => {
    try {
      const resp = await fetch(`/tasks/${todoData.id}`, {
        method: "PUT",
        body: JSON.stringify(todoData.title),
      });
      const data = await resp.json();
      if (resp.status === 200) {
        router.back();
      } else {
        setError("title", { type: "manual", message: "Something went wrong" });
      }
    } catch (error) {
      console.log("error", error);
      setError("title", { type: "manual", message: "Something went wrong" });
    }
  };

  useEffect(() => {
    getTodoData();
  }, []);

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
