import React, { useState, useEffect } from "react";
import { Input, Text, Center, Loader } from "@mantine/core";
import { TodoItemType } from "@/types/types";
import { IconDeviceIpadPlus } from "@tabler/icons-react";
import ListTodo from "@/components/ListTodo/ListTodo";
import { useRouter } from "next/router";
import Container from "@/components/Container/Container";
import { CloseButton } from "@mantine/core";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoById, getTodoList } from "@/services/queries";

const Home = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Array<TodoItemType>>([]);
  const [apiError, setApiError] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: todoList, isFetching } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodoList,
  });

  useEffect(() => {
    if (searchValue) {
      handleSearch({ target: { value: searchValue } });
    }
  }, [todoList]);

  const handleSearch = (event: any) => {
    const {
      target: { value },
    } = event;
    setSearchValue(value);
    if (!value) return;
    const values = todoList.filter((todo: TodoItemType) =>
      todo.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResult(values);
  };

  const deleteTodo = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  const handleEdit = (id: number) =>
    router.push({ pathname: "/tasks/[id]/edit", query: { id } });

  const handleAdd = () => router.push("/tasks/new");

  if (isFetching) {
    return (
      <Center className="h-screen">
        <Loader />
      </Center>
    );
  }

  return (
    <Container>
      <div className="flex w-full md:w-1/2 lg:w-1/3 items-center">
        <Input
          placeholder="Search Todo List"
          className="w-full mr-4"
          value={searchValue}
          variant="filled"
          onChange={handleSearch}
        />
        <CloseButton
          variant="filled"
          color="gray"
          icon={<IconDeviceIpadPlus />}
          onClick={handleAdd}
        />
      </div>

      {/* <AddTodo onCreate={getTodoList} /> */}
      {apiError && <Text c="red">{apiError}</Text>}
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 w-full gap-4">
        {searchResult.length > 0 &&
          searchValue &&
          searchResult.map((todo) => (
            <ListTodo
              todo={todo}
              deleteTodo={() => deleteTodo.mutate(todo.id)}
              editTodo={() => handleEdit(todo.id)}
              key={todo.id}
            />
          ))}
        {todoList.length > 0 &&
          !searchValue &&
          todoList.map((todo: TodoItemType) => (
            <ListTodo
              todo={todo}
              deleteTodo={() => deleteTodo.mutate(todo.id)}
              editTodo={() => handleEdit(todo.id)}
              key={todo.id}
            />
          ))}
      </div>
    </Container>
  );
};

export default Home;
