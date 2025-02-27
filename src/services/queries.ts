import { ISortingType, ITodoFormType, ITodoItemType } from "@/types/types";

// Get API function used in Tanstack Query
export const getTodoList = async () => {
  try {
    const list = await fetch("/tasks");
    const todoData = await list.json();
    if (list.status === 200) {
      return todoData;
    } else {
      throw new Error(todoData.msg);
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

//Delete API Function used in Tanstack query
export const deleteTodoById = async (id: number) => {
  try {
    const resp = await fetch(`/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await resp.json();
    if (resp.status === 200) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// Get API to get a todo by it'd unique ID
export const getTodoById = async (id: number) => {
  try {
    const list = await fetch(`/tasks/${id}`);

    const todoData = await list.json();
    if (list.status === 200) {
      return todoData;
    } else {
      throw new Error(todoData.msg);
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};


//Update API to update a selected Todo with it's unique ID
export const updateTodoData = async (todoData: ITodoItemType) => {
  try {
    const resp = await fetch(`/tasks/${todoData.id}`, {
      method: "PUT",
      body: JSON.stringify(todoData.title),
    });
    const data = await resp.json();
    if (resp.status === 200) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

//Post API to Create a New Todo
export const createTodo = async (todoData: ITodoFormType) => {
  try {
    const resp = await fetch("/tasks", {
      method: "POST",
      body: JSON.stringify(todoData.title),
    });
    const data = await resp.json();
    if (resp.status === 200) {
      return "Todo Created";
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// Search API used to implement sever side search functionality
export const searchTodo = async (title: string) => {
  try {
    const resp = await fetch("/tasks/search", {
      method: "POST",
      body: JSON.stringify(title),
    });
    const data = await resp.json();
    if (resp.status === 200) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

// Pagination API used to implement server side pagination functionality
export const paginationTodo = async ({
  pageIndex,
  pageSize,
  sort,
}: ISortingType) => {
  try {
    const resp = await fetch(`/tasks/pagination/${sort}`, {
      method: "POST",
      body: JSON.stringify({ pageSize, pageIndex }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await resp.json();
    if (resp.status === 200) {
      return data;
    } else {
      throw new Error(data.msg);
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
