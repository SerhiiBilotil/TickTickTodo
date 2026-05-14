import React from "react";

import { TouchableOpacity } from "react-native";

import { Box } from "./Box";
import { Text } from "./Text";

type Props = {
    onPress: () => void;
};

export const FloatingButton = ({
                                   onPress,
                               }: Props) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{
                position: "absolute",
                right: 24,
                bottom: 24,
            }}
        >
            <Box
                width={60}
                height={60}
                borderRadius="xl"
                alignItems="center"
                justifyContent="center"
                backgroundColor="primary"
            >
                <Text variant="button">
                    +
                </Text>
            </Box>
        </TouchableOpacity>
    );
};
