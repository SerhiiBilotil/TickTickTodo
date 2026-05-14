import React from "react";

import {
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

import { Box } from "./Box";
import { Text } from "./Text";

type Props = TouchableOpacityProps & {
    title?: string;
    children?: React.ReactNode;

    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;

    variant?: "primary" | "secondary" | "ghost";
};

export const Button = ({
                           title,
                           children,
                           leftIcon,
                           rightIcon,
                           variant = "primary",
                           ...props
                       }: Props) => {

    const backgroundColor =
        variant === "primary"
            ? "primary"
            : variant === "secondary"
                ? "secondaryCard"
                : "transparent";

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            {...props}
        >
            <Box
                paddingVertical="m"
                paddingHorizontal="l"
                borderRadius="m"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                gap="s"
            >
                {leftIcon}

                {children || (
                    <Text
                        color="white"
                        variant="button"
                    >
                        {title}
                    </Text>
                )}

                {rightIcon}
            </Box>
        </TouchableOpacity>
    );
};
