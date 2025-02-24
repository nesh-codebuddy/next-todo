import { TodoFormType, TodoItemType } from "@/types/types";
import { Button, Input, Text } from "@mantine/core";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Container from "../Container/Container";
import { useRouter } from "next/router";

// On Submit, Register and errors are three props will are required to be passed to this component
interface TodoForm {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<TodoFormType> | UseFormRegister<TodoItemType>;
  errors: FieldErrors<TodoItemType>;
  isEdit?: boolean;
}
// This is a common form component used to add new todo and to edit an exsiting todo
const TodoForm = ({ onSubmit, register, errors, isEdit = false }: TodoForm) => {
  const router = useRouter();
  const { asPath } = router;
  const hash = asPath.split("#")[1];
  return (
    <form onSubmit={onSubmit} className="w-full">
      <Container>
        <Input
          placeholder={isEdit ? "Update the Todo" : "Add A New Todo"}
          variant="filled"
          size="sm"
          className={
            hash === "table-view" ? "w-full" : "w-full md:w-1/2 lg:w-1/3"
          }
          autoFocus={true}
          {...register("title", { required: true })}
        />
        {errors.title && <Text c="red">{errors.title.message}</Text>}
        {errors.id && <Text c="red">{errors.id.message}</Text>}
        <Button variant="filled" color="gray" type="submit" className="mt-4">
          Submit
        </Button>
      </Container>
    </form>
  );
};

export default TodoForm;
