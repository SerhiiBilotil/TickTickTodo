import { create } from "zustand";
import { Todo, TodoState} from "@/entities/todo/model/types";
import {moveTodo} from "@/features/todos/lib/todo.utils";




export const useTodoStore = create<TodoState>((set, get) => ({

    reorderTodos: (id: string, index: number, categoryId: string,) => {
        set((state: TodoState) => ({
            todos: moveTodo(
                state.todos,
                id,
                categoryId,
                index,
            ),
        }));
    },

    moveTodoToCategory: (id: string, categoryId: string, index: number,) => {
        set((state: TodoState) => ({
            todos: moveTodo(
                state.todos,
                id,
                categoryId,
                index,
            ),
        }));
    },

    addTodoItem: (todo: Omit<Todo, "id">,) =>
        set((state: TodoState) => ({
            todos: [
                ...state.todos,
                {
                    ...todo,
                    id: Date.now().toString(),
                },
            ],
        })),

    //Todo data
    categories: [
        {
            id: "today",
            title: "Today",
        },
        {
            id: "week",
            title: "This Week",
        },
        {
            id: "personal",
            title: "Personal",
        },
    ],
    todos: [
        {
            id: "1",
            title: "Buy groceries",
            description: "Milk, eggs, bread, vegetables",
            categoryId: "today",
        },
        {
            id: "2",
            title: "Buy groceries",
            description: "Milk, eggs, bread, vegetables",
            categoryId: "today",
        },
        {
            id: "3",
            title: "Reply to emails",
            description: "Clear inbox and respond to pending messages",
            categoryId: "today",
        },
        {
            id: "4",
            title: "Finish project report",
            description: "Complete final report and send to manager",
            categoryId: "week",
        },
        {
            id: "5",
            title: "Team meeting preparation",
            description: "Prepare slides and agenda for Monday meeting",
            categoryId: "week",
        },
        {
            id: "6",
            title: "Read book",
            description: "Continue reading 'Deep Work'",
            categoryId: "personal",
        },
        {
            id: "7",
            title: "Go jogging",
            description: "30-minute run in the evening",
            categoryId: "personal",
        },
        {
            id: "8",
            title: "Go jogging 2",
            description: "30-minute run in the evening",
            categoryId: "personal",
        },
        {
            id: "9",
            title: "Finish project report",
            description: "Complete final report and send to manager",
            categoryId: "week",
        },
        {
            id: "10",
            title: "Team meeting preparation",
            description: "Prepare slides and agenda for Monday meeting",
            categoryId: "week",
        },
        {
            id: "11",
            title: "Read book",
            description: "Continue reading 'Deep Work'",
            categoryId: "personal",
        },
        {
            id: "12",
            title: "Go jogging",
            description: "30-minute run in the evening",
            categoryId: "personal",
        },
        {
            id: "13",
            title: "Reply to emails",
            description: "Clear inbox and respond to pending messages",
            categoryId: "today",
        },
        {
            id: "14",
            title: "Finish project report",
            description: "Complete final report and send to manager",
            categoryId: "week",
        },
        {
            id: "15",
            title: "Reply to emails",
            description: "Clear inbox and respond to pending messages",
            categoryId: "today",
        },
        {
            id: "16",
            title: "Finish project report",
            description: "Complete final report and send to manager",
            categoryId: "week",
        },
    ],
}));
