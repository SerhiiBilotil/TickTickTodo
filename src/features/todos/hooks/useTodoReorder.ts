
import { useTodoStore } from "@/store/todo.store";

export function useTodoReorder() {
    const reorder = useTodoStore((s) => s.reorderTodos);
    const changeCategory = useTodoStore((s) => s.moveTodoToCategory);

    return {
        reorder,
        changeCategory,
    };
}
