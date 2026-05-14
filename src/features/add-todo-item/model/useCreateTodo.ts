import { useState } from "react";

import { useTodoStore } from "@/store/todo.store";

export const useCreateTodo = (
    onClose: () => void
) => {
    const addTodo = useTodoStore(
        (s) => s.addTodoItem
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] =
        useState("");

    const [categoryId, setCategoryId] =
        useState("today");

    const [error, setError] =
        useState<string | null>(null);

    const submit = () => {
        if (!title.trim()) {
            setError("Title is required");
            return;
        }

        addTodo({
            title,
            description,
            categoryId,
        });

        setTitle("");
        setDescription("");
        setCategoryId("today");

        onClose();
    };

    return {
        title,
        setTitle,

        description,
        setDescription,

        categoryId,
        setCategoryId,

        error,

        submit,
    };
};
