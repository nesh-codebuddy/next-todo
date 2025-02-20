import { http, HttpResponse } from "msw";
import { TodoItemType } from "../types/types";

export const todoCRUD = [
  // Get all the todo items
  http.get("/tasks", () => {
    let store: any = localStorage.getItem("todoData");
    store = store ? JSON.parse(store) : [];
    console.log("store", store);
    return HttpResponse.json(store, { status: 200 });
  }),

  // Get a single todo filterd using the unique id, used when editing the todo
  http.get("/tasks/:id", ({ params }) => {
    let store: any = localStorage.getItem("todoData");
    store = store ? JSON.parse(store) : [];
    console.log("store", store);
    if (!params.id) {
      return HttpResponse.text("No Id found to delete", { status: 500 });
    }
    const todoItemIndex = store.findIndex(
      (todo: TodoItemType) => todo.id === +params.id
    );
    const currentTodo = store[todoItemIndex];
    return HttpResponse.json(currentTodo, { status: 200 });
  }),

  // Used to create a new todo, will be pushed at the end of the list
  http.post("/tasks", async ({ request }) => {
    const newTodoTitle = await request.json();
    console.log("newTodo", newTodoTitle);

    const newTodo = {
      id: new Date().getTime(),
      title: newTodoTitle,
    };

    let store: any = localStorage.getItem("todoData");
    store = store ? JSON.parse(store) : [];
    store = [...store, newTodo];
    localStorage.setItem("todoData", JSON.stringify(store));
    return HttpResponse.json(newTodo, { status: 200 });
  }),

  // Will be used when editing the todo the data will be updated at the current index of the todo
  http.put("/tasks/:id", async ({ request, params }) => {
    const newTodoTitle = await request.json();
    console.log("newTodo", newTodoTitle);

    let store: any = localStorage.getItem("todoData");
    store = store ? JSON.parse(store) : [];
    if (!params.id) {
      return HttpResponse.text("No Id found to delete", { status: 500 });
    }
    const todoItemIndex = store.findIndex(
      (todo: TodoItemType) => todo.id === +params.id
    );
    store[todoItemIndex].title = newTodoTitle;
    localStorage.setItem("todoData", JSON.stringify(store));
    return HttpResponse.json(store[todoItemIndex], { status: 200 });
  }),

  //Will be used to delete the todo with the id provided
  http.delete("/tasks/:id", ({ params }) => {
    let store: any = localStorage.getItem("todoData");
    store = store ? JSON.parse(store) : [];
    if (store.length === 0) {
      return HttpResponse.text("No Record to delete", { status: 500 });
    }
    if (!params.id) {
      return HttpResponse.text("No Id found to delete", { status: 500 });
    }
    const todoItemIndex = store.findIndex(
      (todo: TodoItemType) => todo.id === +params.id
    );
    const currentTodo = store[todoItemIndex];
    store = [
      ...store.slice(0, todoItemIndex),
      ...store.slice(todoItemIndex + 1),
    ];
    localStorage.setItem("todoData", JSON.stringify(store));
    return HttpResponse.json(currentTodo, { status: 200 });
  }),
];
