import { create } from "zustand";
import {Category, Todo, TodoState} from "@/entities/todo/model/types";


export const useTodoStore = create<TodoState>((set, get) => ({


    setTodos: (todos) => set({ todos }),

    setCategories: (categories) => set({ categories }),

    reorderTodos: (id, index, categoryId) => {
        set((state) => {
            const list = [...state.todos];

            const fromIndex = list.findIndex(t => t.id === id);
            if (fromIndex === -1) return state;

            const item = list[fromIndex];

            list.splice(fromIndex, 1);

            const categoryItems = list.filter(t => t.categoryId === categoryId);

            const others = list.filter(t => t.categoryId !== categoryId);

            const safeIndex = Math.max(0, Math.min(index, categoryItems.length));

            categoryItems.splice(safeIndex, 0, item);

            return {
                todos: [...others, ...categoryItems],
            };
        });
    },

    moveTodoToCategory: (id, categoryId, index) => {
        set((state) => {
            const list = [...state.todos];

            const fromIndex = list.findIndex(t => t.id === id);
            if (fromIndex === -1) return state;

            const item = { ...list[fromIndex], categoryId };

            list.splice(fromIndex, 1);

            const categoryItems = list.filter(t => t.categoryId === categoryId);
            const others = list.filter(t => t.categoryId !== categoryId);

            const safeIndex = Math.max(0, Math.min(index, categoryItems.length));

            categoryItems.splice(safeIndex, 0, item);

            return {
                todos: [...others, ...categoryItems],
            };
        });
    },

    addTodoItem: (todo) =>
        set((state) => ({
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
    ],
}));
