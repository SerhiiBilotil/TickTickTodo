import React from "react";
import { Pressable } from "react-native";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";

type Props = {
    open: boolean;
    anchor: {
        x: number;
        y: number;
    };
    categories: Array<{
        id: string;
        title: string;
    }>;
    onSelect: (id: string) => void;
    onClose: () => void;
};

export const CategorySelectModal = ({
                                        open,
                                        anchor,
                                        categories,
                                        onSelect,
                                        onClose,
                                    }: Props) => {
    if (!open) return null;
    console.log('open')

    return (
        <Pressable
            style={{
                position: "absolute",
                zIndex: 9999,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
            onPress={onClose}
        >
            <Box
                position="absolute"
                top={anchor.y}
                left={anchor.x}
                width={220}
                backgroundColor="card"
                borderRadius="l"
                padding="m"
                gap="s"
                elevation={10}
            >
                {categories.map((cat) => (
                    <Pressable
                        key={cat.id}
                        onPress={() => onSelect(cat.id)}
                    >
                        <Box padding="s" borderRadius="m">
                            <Text color="white">{cat.title}</Text>
                        </Box>
                    </Pressable>
                ))}
            </Box>
        </Pressable>
    );
};
