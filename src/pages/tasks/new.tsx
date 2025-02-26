import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ITodoFormType } from "@/types/types";
import { useRouter } from "next/router";
import TodoForm from "@/components/TodoForm.tsx/TodoForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  } = useForm<ITodoFormType>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<ITodoFormType> = async (data) => {
    try {
      const resp = await fetch("/tasks", {
        method: "POST",
        body: JSON.stringify(data.title),
      });
      if (resp.status === 200) {
        setValue("title", "");
        router.back();
      } else {
        setError("title", { type: "manual", message: "Something went wrong" });
      }
    } catch (error) {
      setError("title", { type: "manual", message: "Something went wrong" });
    }
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
