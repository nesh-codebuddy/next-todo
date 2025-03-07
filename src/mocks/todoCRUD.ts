import { http, HttpResponse } from "msw";
import { ITodoItemType } from "../types/types";

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
];
