import React from "react";

import { Box } from "@/shared/ui/Box";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";

import { useCreateTodo } from "../model/useCreateTodo";
import {CategorySelectModal} from "@/features/add-todo-item/ui/CategorySelectModal";
import {useUIStore} from "@/store/ui.store";
import {useTodoStore} from "@/store/todo.store";

type Props = {
    onClose: () => void;
    categoryOpen: boolean;
    onCloseCategory: (open: boolean) => void;
};

export const CreateTodoForm = ({ onClose ,categoryOpen,onCloseCategory }: Props) => {
    const {
        title,
        setTitle,
        description,
        setDescription,
        categoryId,
        setCategoryId,
        submit,
    } = useCreateTodo(onClose);

    const categories = useTodoStore((state) => state.categories);



    console.log('cat', categories)
    return (
        <Box
            backgroundColor="card"
            borderRadius="l"
            padding="l"
            gap="m"
        >
            <Input
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />

            <Input
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />


            <Button
                title={`Category: ${
                    categories.find(
                        (c) => c.id === categoryId
                    )?.title
                }`}
                onPress={onCloseCategory}
                variant="secondary"
            />

            <Button title="Create" onPress={submit} />

            <CategorySelectModal
                open={categoryOpen}
                onClose={onCloseCategory}
                value={categoryId}
                onChange={setCategoryId}
                categories={categories}
            />
        </Box>
    );
};
