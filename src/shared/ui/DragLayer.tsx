import React from "react";
import { View } from "react-native";
import { useTodoStore } from "@/store/store";
import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";

export const DragLayer = () => {
    const drag = useTodoStore((s) => s.drag);
    const todos = useTodoStore((s) => s.todos);

    if (!drag.activeTodoId) return null;

    const todo = todos.find((t) => t.id === drag.activeTodoId);
    if (!todo) return null;

    return (
        <View
            pointerEvents="none"
            style={{
                position: "absolute",
                top: drag.y ?? 0,
                left: drag.x ?? 0,
                zIndex: 9999,
            }}
        >
            <Box padding="m" borderRadius="m" backgroundColor="card">
                <Text>{todo.title}</Text>
            </Box>
        </View>
    );
};
