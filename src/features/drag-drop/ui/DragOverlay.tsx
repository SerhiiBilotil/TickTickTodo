import Animated, { useAnimatedStyle } from "react-native-reanimated";
import React from "react";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";

import { useDrag } from "@/features/drag-drop/model/DragProvider";
import { useDragStore } from "@/store/drag.store";
import { useTodoStore } from "@/store/todo.store";

export const DragOverlay = () => {
    const { x, y } = useDrag();

    const activeId = useDragStore((s) => s.activeId);

    const todos = useTodoStore((s) => s.todos);

    const todo = activeId
        ? todos.find((t) => t.id === activeId)
        : null;

    const style = useAnimatedStyle(() => {
        const hidden =
            x.value === 0 &&
            y.value === 0;

        return {
            position: "absolute",
            zIndex: 999,
            transform: [
                { translateX: x.value - 25 },
                { translateY: y.value - 25 },
            ],
            opacity:
                activeId && !hidden
                    ? 1
                    : 0,
        };
    });

    if (!todo || !activeId) {
        return null;
    }

    return (
        <Animated.View style={style}>
            <Box
                padding="m"
                borderRadius="m"
                backgroundColor="card"
            >
                <Text>{todo.title}</Text>
            </Box>
        </Animated.View>
    );
};
