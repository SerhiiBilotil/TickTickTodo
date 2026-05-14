import React from "react";

import {
    TextInput,
    TextInputProps,
} from "react-native";

import { Box } from "./Box";

type Props = TextInputProps;

export const Input = (
    props: Props
) => {
    return (
        <Box
            borderWidth={1}
            borderColor="border"
            borderRadius="m"
            paddingHorizontal="m"
            paddingVertical="s"
        >
            <TextInput
                placeholderTextColor="#999"
                style={{
                    color: "#fff",
                    fontSize: 16,
                }}
                {...props}
            />
        </Box>
    );
};
