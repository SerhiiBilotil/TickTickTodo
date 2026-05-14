import React from "react";

import {
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

import { Box } from "./Box";
import { Text } from "./Text";

type Props = TouchableOpacityProps & {
    title: string;
};

export const Button = ({
                           title,
                           ...props
                       }: Props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            {...props}
        >
            <Box
                backgroundColor="primary"
                paddingVertical="m"
                paddingHorizontal="l"
                borderRadius="m"
                alignItems="center"
                justifyContent="center"
            >
                <Text
                    color="white"
                    variant="button"
                >
                    {title}
                </Text>
            </Box>
        </TouchableOpacity>
    );
};
