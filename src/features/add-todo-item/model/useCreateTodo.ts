import {useEffect, useState} from "react";

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
        console.log('cat id', categoryId)
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


    useEffect(() => {
        console.log('cati', categoryId);
    },[categoryId]);

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
