import { create } from "zustand";
import { Todo, Category } from "@/entities/todo/model/types";

type DragState = {
    activeTodoId: string | null;
    isDragging: boolean;

    overId: string | null;
    overIndex: number | null;
};

type Todo = {
    id: string;
    title: string;
    categoryId: string;
    order: number;
};

type TodoState = {
    categories: Category[];
    todos: Todo[];

    drag: DragState;

    setActiveTodo: (id: string | null) => void;

    startDrag: (id: string) => void;
    endDrag: () => void;
    resetDrag: () => void;

    setOver: (id: string | null, index: number | null) => void;

    reorderTodos: (
        activeId: string,
        overIndex: number,
        categoryId: string
    ) => void;

    moveTodoToCategory: (todoId: string, categoryId: string) => void;

    setHoverPreview: (
        categoryId: string | null,
        index: number | null
    ) => void;
};




export const useTodoStore = create<TodoState>((set, get) => ({
    categories: [
        { id: "today", title: "Today" },
        { id: "week", title: "This Week" },
        { id: "personal", title: "Personal" },
    ],

    todos: [
        { id: "1", title: "Buy groceries", categoryId: "today" },
        { id: "2", title: "Reply to emails", categoryId: "today" },
        { id: "5", title: "Finish project report", categoryId: "week" },
        { id: "6", title: "Team meeting preparation", categoryId: "week" },
        { id: "8", title: "Read book", categoryId: "personal" },
        { id: "9", title: "Go jogging", categoryId: "personal" },
    ],

    drag: {
        activeTodoId: null,
        isDragging: false,
        overId: null,
        overIndex: null,
    },

    hoverPreview: {
        categoryId: null,
        index: null,
    },



    setActiveTodo: (id) =>
        set((state) => ({
            drag: {
                ...state.drag,
                activeTodoId: id,
                isDragging: !!id,
            },
        })),

    startDrag: (id) =>
        set(() => ({
            drag: {
                activeTodoId: id,
                isDragging: true,
                overId: null,
                overIndex: null,
            },
        })),

    setOver: (id, index) =>
        set((state) => ({
            drag: {
                ...state.drag,
                overId: id,
                overIndex: index,
            },
        })),

    endDrag: () =>
        set((state) => ({
            drag: {
                activeTodoId: null,
                isDragging: false,
                overId: null,
                overIndex: null,
            },
        })),

    resetDrag: () =>
        set(() => ({
            drag: {
                activeTodoId: null,
                isDragging: false,
                overId: null,
                overIndex: null,
            },
        })),
    reorderTodos: (activeId, overIndex, categoryId) => {
        set((state) => {

            const todos = [...state.todos];
            const activeIndex = todos.findIndex((t) => t.id === activeId);

            if (activeIndex === -1) return state;

            const activeTodo = todos[activeIndex];

            todos.splice(activeIndex, 1);

            todos.splice(overIndex, 0, {
                ...activeTodo,
                categoryId,
            });

            return { todos };
        });
    },

    moveTodoToCategory: (todoId, categoryId) => {
        set((state) => ({
            todos: state.todos.map((t) =>
                t.id === todoId
                    ? { ...t, categoryId }
                    : t
            ),
        }));
    },

    setHoverPreview: (categoryId, index) =>
        set({
            hoverPreview: {
                categoryId,
                index,
            },
        }),
}));
