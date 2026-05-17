import { useShallow } from "zustand/react/shallow";
import { useTodoStore } from "./todo.store";

export function useTodoState() {
    return useTodoStore(
        useShallow((s) => ({
            todos: s.todos,
            categories: s.categories,

            reorderTodos: s.reorderTodos,
            moveTodoToCategory: s.moveTodoToCategory,

            addTodoItem: s.addTodoItem,
            setTodos: s.setTodos,
            setCategories: s.setCategories,
        }))
    );
}
