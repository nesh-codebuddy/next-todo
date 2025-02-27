import { setupWorker } from 'msw/browser'
import { todoCRUD } from "./todoCRUD"

// Browser Implementation of MSW
export const worker = setupWorker(...todoCRUD)