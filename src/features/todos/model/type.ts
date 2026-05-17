
export type Todo = {
    id: string;
    title: string;
    description?: string;
    categoryId: string;
};

export type Category = {
    id: string;
    title: string;
};

export type TodoState = {
    categories: Category[];
    todos: Todo[];

    setTodos: (todos: Todo[]) => void;
    addTodoItem: (todo: Omit<Todo, "id">) => void;

    setCategories: (categories: Category[]) => void;

    reorderTodos: (
        activeId: string,
        overIndex: number,
        categoryId: string
    ) => void;

    moveTodoToCategory: (todoId: string, categoryId: string) => void;

};
