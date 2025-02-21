import { TodoFormType, TodoItemType } from "@/types/types";

export const getTodoList = async () => {
  try {
    const list = await fetch("/tasks", {
      method: "GET",
    });
    const todoData = await list.json();
    return todoData;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const deleteTodoById = async (id: number) => {
  try {
    const resp = await fetch(`/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    return data;
  } catch (error: any) {
    throw new Error("Something went wrong");
  }
};

export const getTodoById = async (id: number) => {
  try {
    const list = await fetch(`/tasks/${id}`, {
      method: "GET",
    });
    if (list.status === 200) {
      const todoData = await list.json();
      return todoData;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error: any) {
    throw new Error("Something went wrong");
  }
};

export const updateTodoData = async (todoData: TodoItemType) => {
  try {
    const resp = await fetch(`/tasks/${todoData.id}`, {
      method: "PUT",
      body: JSON.stringify(todoData.title),
    });
    const data = await resp.json();
    if (resp.status === 200) {
      return data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const createTodo = async (todoData: TodoFormType) => {
  try {
    const resp = await fetch("/tasks", {
      method: "POST",
      body: JSON.stringify(todoData.title),
    });
    if (resp.status === 200) {
      return "Todo Created";
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error: any) {
    throw new Error("Something went wrong");
  }
};
