import React, { useState, useEffect } from "react";
import { Input, Text, Center, Loader } from "@mantine/core";
import { ITodoItemType } from "@/types/types";
import { IconDeviceIpadPlus } from "@tabler/icons-react";
import ListTodo from "@/components/ListTodo/ListTodo";
import { useRouter } from "next/router";
import Container from "@/components/Container/Container";
import { CloseButton } from "@mantine/core";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodoById, getTodoList, searchTodo } from "@/services/queries";

const Home = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<Array<ITodoItemType>>([]);
  const [apiError, setApiError] = useState<string | Error>("");

  const queryClient = useQueryClient();
  const {
    data: todoList = [],
    isFetching,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodoList,
  });

  useEffect(() => {
    if (searchValue) {
      handleSearch({ target: { value: searchValue } });
    }
  }, [todoList]);

  const handleSearchMutation = useMutation({
    mutationFn: searchTodo,
    onSuccess: (data) => {
      setSearchResult(data);
    },
    onError: (error) => {
      setApiError(error.message);
    },
  });

  const deleteTodo = useMutation({
    mutationFn: deleteTodoById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      setApiError(error.message);
    },
  });

  const handleEdit = (id: number) =>
    router.push({ pathname: "/tasks/[id]/edit", query: { id } });

  const handleAdd = () => router.push("/tasks/new");

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }
  ) => {
    const {
      target: { value },
    } = event;
    setSearchValue(value);
    handleSearchMutation.mutate(value);
  };

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
      {error && <Text c="red">{error?.message}</Text>}
      {apiError && <Text c="red">{`${apiError}`}</Text>}
      {searchValue && searchResult.length === 0 && (
        <Text className="text !mt-4">No Search Result Found</Text>
      )}
      {todoList.length === 0 && !searchValue && (
        <Text className="text !mt-4">No Results Found</Text>
      )}
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
          todoList.map((todo: ITodoItemType) => (
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
