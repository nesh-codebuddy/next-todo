import React, { useState, useEffect } from "react";
import { Input, Text } from "@mantine/core";
import { ITodoItemType } from "@/types/types";
import AddTodo from "@/components/AddTodo/AddTodo";
import ListTodo from "@/components/ListTodo/ListTodo";
import { useRouter } from "next/router";
import Container from "@/components/Container/Container";

const Home = () => {
  const router = useRouter();
  const [todoList, setTodoList] = useState<Array<ITodoItemType>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Array<ITodoItemType>>([]);
  const [apiError, setApiError] = useState<string | Error>("");

  const getTodoList = async () => {
    try {
      const list = await fetch("/tasks");
      const todoData = await list.json();
      if (list.status === 200) {
        setTodoList(todoData);
      } else {
        setApiError(todoData.msg);
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error);
      }
    }
  };

  useEffect(() => {
    setTimeout(getTodoList, 200);
  }, []);

  useEffect(() => {
    if (searchValue) {
      handleSearch({ target: { value: searchValue } });
    }
  }, [todoList]);

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }
  ) => {
    const {
      target: { value },
    } = event;
    setSearchValue(value);
    if (!value) return;
    const values = todoList.filter((todo: ITodoItemType) =>
      todo.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(values);
  };

  const handleDelete = async (id: number) => {
    try {
      const resp = await fetch(`/tasks/${id}`, {
        method: "DELETE",
      });
      console.log("resp", resp);
      const todoData = await resp.json();
      if (resp.status === 200) {
        getTodoList();
      } else {
        setApiError(todoData.msg);
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error);
      }
    }
  };

  const handleEdit = (id: number) =>
    router.push({ pathname: "/edit/[id]", query: { id } });

  return (
    <Container>
      <Input
        placeholder="Search Todo List"
        className="w-full md:w-1/2 lg:w-1/3"
        value={searchValue}
        variant="filled"
        onChange={handleSearch}
      />
      <AddTodo onCreate={getTodoList} />
      {apiError && <Text c="red">{`${apiError}`}</Text>}
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
        {searchResult.length > 0 &&
          searchValue &&
          searchResult.map((todo) => (
            <ListTodo
              todo={todo}
              deleteTodo={() => handleDelete(todo.id)}
              editTodo={() => handleEdit(todo.id)}
              key={todo.id}
            />
          ))}
        {todoList.length > 0 &&
          !searchValue &&
          todoList.map((todo) => (
            <ListTodo
              todo={todo}
              deleteTodo={() => handleDelete(todo.id)}
              editTodo={() => handleEdit(todo.id)}
              key={todo.id}
            />
          ))}
      </div>
    </Container>
  );
};

export default Home;
