import React from "react";
import { Keyboard } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { Box } from "@/shared/ui/Box";
import { Button } from "@/shared/ui/Button";

type Props = {
    title: string;
    setTitle: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    submit: () => void;
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
            <Box
                backgroundColor="card"
                borderColor='white'
                borderRadius="l"
                borderBottomWidth="1"



            >
            <BottomSheetTextInput
                ref={inputRef}
                placeholder="Title"
                placeholderTextColor="#fff"
                value={title}
                onChangeText={setTitle}
                returnKeyType="next"
                style={{
                    fontSize: 13,
                    color: "#fff",
                    padding: 5,
                    paddingHorizontal: 6,
                }}
            />
            </Box>
            <Box
                backgroundColor="card"
                borderColor='white'
                borderRadius="l"
                borderBottomWidth="1"
            >
            <BottomSheetTextInput
                placeholder="Description"
                placeholderTextColor="#fff"
                value={description}
                onChangeText={setDescription}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                multiline
                style={{
                    fontSize: 13,
                    color: "#fff",
                    paddingHorizontal: 6,
                    padding: 5,
                }}
            />
            </Box>

            <Box
                backgroundColor="primary"
                borderRadius="l"
            >
            <Button title="Create" onPress={handleSubmit}/>
            </Box>


        </Box>
    );
};
