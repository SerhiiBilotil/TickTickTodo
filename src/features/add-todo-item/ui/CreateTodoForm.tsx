import React, {useEffect} from "react";
import { Keyboard } from "react-native";

import { Box } from "@/shared/ui/Box";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";

import { useCreateTodo } from "../model/useCreateTodo";
import { useTodoStore } from "@/store/todo.store";

type Props = {
    onClose: () => void;
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    categoryId: string;
    setCategoryId: (id: string) => void;
    submit: () => void;
    onCloseCategory: () => void;
    inputRef?: any;
};

export const CreateTodoForm = ({
                                   title,
                                   setTitle,
                                   description,
                                   setDescription,
                                   submit,
                                   inputRef,
                               }: Props) => {




    const handleSubmit = () => {
        if (!title.trim()) return;

        submit();
        Keyboard.dismiss();
    };

    return (
        <Box
            backgroundColor="card"
            borderRadius="l"
            gap="m"
        >
            <Input
                ref={inputRef}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}

                style={{
                    width: "100%",
                    fontSize: 13,
                    color: "#fff",
                    paddingVertical: 6,
                }}
                returnKeyType="next"
            />

            <Input
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                style={{
                    width: "100%",
                    fontSize: 13,
                    color: "#fff",
                    paddingVertical: 6,
                }}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
            />

            <Button title="Create" onPress={handleSubmit} />
        </Box>
    );
};
