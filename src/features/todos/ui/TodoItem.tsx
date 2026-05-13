import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { useTodoStore } from "@/store/store";

import { useTodoDragController } from "../model/useTodoDragController";

export const TodoItem = ({ todo }) => {
    const { gesture, scale } = useTodoDragController({ todo });

    const activeTodoId = useTodoStore((s) => s.drag.activeTodoId);
    const isActive = activeTodoId === todo.id;

    const style = useAnimatedStyle(() => ({

        opacity: isActive ? 0 : 1,
        zIndex: isActive ? 999 : 1,
    }));

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={style}>
                <Box padding="m" borderRadius="m" backgroundColor="card">
                    <Text>{todo.title}</Text>
                </Box>
            </Animated.View>
        </GestureDetector>
    );
};
