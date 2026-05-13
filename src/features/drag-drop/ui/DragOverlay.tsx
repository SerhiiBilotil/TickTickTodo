import Animated, {
    useAnimatedStyle,
} from "react-native-reanimated";

import { View } from "react-native";

import { useTodoStore } from "@/store/store";
import { useDrag } from "@/features/drag-drop/DragProvider";
import {Box} from "@/shared/ui/Box";
import {Text} from "@/shared/ui/Text";
import React from "react";

export const DragOverlay = () => {
    const { x, y } = useDrag();

    const drag = useTodoStore((s) => s.drag);
    const todos = useTodoStore((s) => s.todos);

    const todo = todos.find(
        (t) => t.id === drag.activeTodoId
    );

    const style = useAnimatedStyle(() => {
        const hidden =
            x.value === 0 &&
            y.value === 0;

        return {
            position: "absolute",
            zIndex: 999,
            transform: [
                { translateX: x.value - 20 },
                { translateY: y.value - 20 },
            ],
            opacity:
                drag.isDragging && !hidden
                    ? 1
                    : 0,
        };
    });

    if (!todo || !drag.isDragging) {
        return null;
    }

    return (

        <Animated.View style={style}>
            <Box padding="m" borderRadius="m" backgroundColor="card">
                <Text>
                    {todo.title}
                </Text>
            </Box>
        </Animated.View>
    );
};
