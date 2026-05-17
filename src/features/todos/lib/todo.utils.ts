import { Todo } from "@/features/todos/model/type";

export const moveTodo = (
    todos: Todo[],
    id: string,
    categoryId: string,
    index: number,
): Todo[] => {
    const list = [...todos];

    const fromIndex =
        list.findIndex(todo => todo.id === id);

    if (fromIndex === -1) {
        return todos;
    }

    const current = list[fromIndex];

    const item: Todo = {
        ...current,
        categoryId,
    };

    list.splice(fromIndex, 1);

    const categoryItems = list.filter(
        todo => todo.categoryId === categoryId,
    );

    const otherItems = list.filter(
        todo => todo.categoryId !== categoryId,
    );

    const safeIndex = Math.max(
        0,
        Math.min(index, categoryItems.length),
    );

    categoryItems.splice(safeIndex, 0, item);

    return [...otherItems, ...categoryItems];
};
