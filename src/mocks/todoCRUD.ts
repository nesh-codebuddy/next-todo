import { DefaultBodyType, http, HttpResponse } from "msw";
import { IPaginationType, ITodoItemType } from "../types/types";

export const todoCRUD = [
  // Get all the todo items
  http.get("/tasks", () => {
    let store: string = localStorage.getItem("todoData") || "";
    let todoData = store ? JSON.parse(store) : [];
    return HttpResponse.json(todoData, { status: 200 });
  }),

  // Get a single todo filterd using the unique id, used when editing the todo
  http.get("/tasks/:id", ({ params }) => {
    let store: string = localStorage.getItem("todoData") || "";
    let todoData = store ? JSON.parse(store) : [];
    if (!params.id) {
      return HttpResponse.text("No Id found to delete", { status: 404 });
    }
    let todoId = parseInt(`${params.id}`);
    if (typeof todoId === "number") {
      const todoItemIndex = todoData.findIndex(
        (todo: ITodoItemType) => todo.id === todoId
      );
      const currentTodo = todoData[todoItemIndex];
      return HttpResponse.json(currentTodo, { status: 200 });
    } else {
      return HttpResponse.json({ msg: "No Id Found" }, { status: 404 });
    }
  }),

  // Used to create a new todo, will be pushed at the end of the list
  http.post("/tasks", async ({ request }) => {
    const newTodoTitle = await request.json();
    console.log("newTodo", newTodoTitle);

    const newTodo = {
      id: new Date().getTime(),
      title: newTodoTitle,
    };

    let store: string = localStorage.getItem("todoData") || "";
    let todoData = store ? JSON.parse(store) : [];
    todoData = [...todoData, newTodo];
    localStorage.setItem("todoData", JSON.stringify(todoData));
    return HttpResponse.json(newTodo, { status: 200 });
  }),

  // Will be used when editing the todo the data will be updated at the current index of the todo
  http.put("/tasks/:id", async ({ request, params }) => {
    const newTodoTitle = await request.json();
    console.log("newTodo", newTodoTitle);

    let store: string = localStorage.getItem("todoData") || "";
    let todoData = store ? JSON.parse(store) : [];
    if (!params.id) {
      return HttpResponse.text("No Id found to delete", { status: 404 });
    }
    let todoId = parseInt(`${params.id}`);
    if (typeof todoId === "number") {
      const todoItemIndex = todoData.findIndex(
        (todo: ITodoItemType) => todo.id === todoId
      );
      todoData[todoItemIndex].title = newTodoTitle;
      localStorage.setItem("todoData", JSON.stringify(todoData));
      return HttpResponse.json(todoData[todoItemIndex], { status: 200 });
    } else {
      return HttpResponse.json({ msg: "No Id Found" }, { status: 404 });
    }
  }),

  //Will be used to delete the todo with the id provided
  http.delete("/tasks/:id", ({ params }) => {
    let store: string = localStorage.getItem("todoData") || "";
    let todoData = store ? JSON.parse(store) : [];
    if (todoData.length === 0) {
      return HttpResponse.text("No Record to delete", { status: 404 });
    }
    if (!params.id) {
      return HttpResponse.text("No Id found to delete", { status: 404 });
    }
    let todoId = parseInt(`${params.id}`);
    if (typeof todoId === "number") {
      const todoItemIndex = todoData.findIndex(
        (todo: ITodoItemType) => todo.id === todoId
      );
      const currentTodo = todoData[todoItemIndex];
      todoData = [
        ...todoData.slice(0, todoItemIndex),
        ...todoData.slice(todoItemIndex + 1),
      ];
      localStorage.setItem("todoData", JSON.stringify(todoData));
      return HttpResponse.json(currentTodo, { status: 200 });
    } else {
      return HttpResponse.json({ msg: "No Id Found" }, { status: 404 });
    }
  }),

  //Search API
  http.post("/tasks/search", async ({ request }) => {
    let store: string = localStorage.getItem("todoData") || "";
    let todoData = store ? JSON.parse(store) : [];
    const searchTodoTitle = await request.json();
    if (!searchTodoTitle) {
      return HttpResponse.json([], { status: 200 });
    }
    if (todoData.length === 0) {
      return HttpResponse.json({ msg: "No Todo to Search" }, { status: 500 });
    }
    const values = todoData.filter((todo: ITodoItemType) =>
      todo.title
        .toLowerCase()
        .includes(searchTodoTitle?.toString().toLowerCase()!)
    );
    console.log("values", values);
    return HttpResponse.json(values, { status: 200 });
  }),

  //Pagination
  http.post("/tasks/pagination/:sorting", async ({ request, params }) => {
    let store: string = localStorage.getItem("todoData") || "";
    let todoData = store ? JSON.parse(store) : [];
    const sorting = params.sorting;
    console.log("sorting", sorting);
    const body = (await request.json()) as IPaginationType;

    const { pageSize, pageIndex } = body;
    var paginatedData = [];
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = pageIndex * pageSize;

    paginatedData = [...todoData.slice(startIndex, endIndex)];
    if (sorting === "asc") {
      paginatedData = paginatedData.sort((a, b) =>
        a.title.toString().localeCompare(b.title.toString())
      );
    }
    if (sorting === "desc") {
      paginatedData = paginatedData.sort((a, b) =>
        b.title.toString().localeCompare(a.title.toString())
      );
    }
    return HttpResponse.json({ paginatedData }, { status: 200 });
  }),
];
