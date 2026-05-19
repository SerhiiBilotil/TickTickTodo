import React from "react";
import { Pressable } from "react-native";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";

const ITEM_HEIGHT = 35;

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

    return (
        <Box
            position="absolute"
            top={anchor.y}
            left={anchor.x}
            minWidth={160}
            zIndex={2}
        >
            <Box
                backgroundColor="border"
                borderRadius="m"
            >
                {categories.map((cat) => (
                    <Pressable
                        key={cat.id}
                        onPress={() => {
                            onSelect(cat.id);
                            onClose();
                        }}
                    >
                        {({ pressed }) => (
                            <Box
                                height={ITEM_HEIGHT}
                                justifyContent="center"
                                paddingHorizontal="m"
                                style={{
                                    opacity: pressed ? 0.6 : 1,
                                }}
                            >
                                <Text>
                                    {cat.title}
                                </Text>
                            </Box>
                        )}
                    </Pressable>
                ))}
            </Box>
        </Box>
    );
};
