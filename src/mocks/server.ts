import { setupServer } from "msw/node";
import { todoCRUD } from "./todoCRUD";

export const server = setupServer(...todoCRUD);
