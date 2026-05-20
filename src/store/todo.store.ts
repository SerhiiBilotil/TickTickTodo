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
            title: "Workout",
            description: "20 min stretching and light cardio",
            categoryId: "today",
        },
        {
            id: "2",
            title: "Buy groceries",
            description: "Milk, eggs, chicken, vegetables",
            categoryId: "today",
        },
        {
            id: "3",
            title: "Reply to Slack messages",
            description: "Answer team questions and update task status",
            categoryId: "today",
        },
        {
            id: "4",
            title: "Finish onboarding flow",
            description: "Complete animations and validation states",
            categoryId: "work",
        },
        {
            id: "5",
            title: "Prepare sprint meeting",
            description: "Review backlog and prepare estimations",
            categoryId: "work",
        },
        {
            id: "6",
            title: "Fix keyboard issue",
            description: "Resolve layout jumping inside bottom sheet",
            categoryId: "work",
        },
        {
            id: "7",
            title: "Read Atomic Habits",
            description: "Finish chapter about habit stacking",
            categoryId: "personal",
        },
        {
            id: "8",
            title: "Evening walk",
            description: "Walk 5km before dinner",
            categoryId: "personal",
        },
        {
            id: "9",
            title: "Clean workspace",
            description: "Organize desk and remove old notes",
            categoryId: "personal",
        },
        {
            id: "10",
            title: "Call parents",
            description: "Catch up and discuss weekend plans",
            categoryId: "personal",
        },
        {
            id: "11",
            title: "Review pull requests",
            description: "Check UI fixes and approve changes",
            categoryId: "week",
        },
        {
            id: "12",
            title: "Plan weekend trip",
            description: "Book hotel and create travel checklist",
            categoryId: "week",
        },
        {
            id: "13",
            title: "Update portfolio",
            description: "Add recent React Native projects",
            categoryId: "week",
        },
        {
            id: "14",
            title: "Refactor todo store",
            description: "Split selectors and optimize rerenders",
            categoryId: "work",
        },
        {
            id: "15",
            title: "Pay internet bill",
            description: "Monthly payment before Friday",
            categoryId: "today",
        },
        {
            id: "16",
            title: "Watch design inspiration",
            description: "Analyze modern productivity app UX",
            categoryId: "personal",
        },
    ]
}));
