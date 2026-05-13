import { Todo, Category } from "@/entities/todo/model/types";

export const selectTodosByCategory = (
    todos: Todo[],
    categoryId: string
) => {
    return todos.filter(
        (todo) => todo.categoryId === categoryId
    );
};

export const selectGroupedTodos = (
    todos: Todo[],
    categories: Category[]
) => {
    return categories.map((category) => ({
        ...category,
        todos: selectTodosByCategory(todos, category.id),
    }));
};
