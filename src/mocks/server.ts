import { setupServer } from "msw/node";
import { todoCRUD } from "./todoCRUD";

//Server Implementation of MSW
export const server = setupServer(...todoCRUD);
