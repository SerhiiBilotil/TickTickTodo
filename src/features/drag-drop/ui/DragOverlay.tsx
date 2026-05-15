import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import React, {useEffect} from "react";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";

import { useDrag } from "@/features/drag-drop/model/DragProvider";
import { useDragStore } from "@/store/drag.store";
import { useTodoStore } from "@/store/todo.store";
import {TODO_ITEM_HEIGHT} from "@/features/todos/constants";


export const DragOverlay = () => {
    const { x, y } = useDrag();

    const activeId = useDragStore((s) => s.activeId);
    const layouts = useDragStore((s) => s.layouts);
    const layout = activeId ? layouts[activeId] : null;

    const anchorX = useDragStore((s) => s.anchorX);
    const anchorY = useDragStore((s) => s.anchorY);

    const todos = useTodoStore((s) => s.todos);

    const todo = activeId
        ? todos.find((t) => t.id === activeId)
        : null;

    const scale = useSharedValue(1);

    useEffect(() => {
        if (activeId) {
            scale.value = withSpring(1.03, {
                damping: 15,
                stiffness: 300,
            });
        } else {
            scale.value = withSpring(1);
        }
    }, [activeId]);


    const style = useAnimatedStyle(() => {
        const visible = !!activeId;


        return {
            position: "absolute",
            left: 0,
            zIndex: 999,
            opacity: visible ? 1 : 0,
            width: layout?.width,
            height: layout?.height,
            transform: visible
                ? [
                    { translateX: x.value - anchorX },
                    { translateY: y.value - anchorY - 50 },
                    { scale: scale?.value },
                ]
                : [],
        };
    });

    if (!todo || !activeId) {
        return null;
    }

    return (
        <Animated.View pointerEvents="none" style={style}>
            <Box
                width={layout.width}
                height={layout.height}
                style={{ flex: 0,  justifyContent: "center",paddingHorizontal: 12 }}
                borderRadius="m"
                backgroundColor="card"
            >
                <Text>{todo.title}</Text>
            </Box>
        </Animated.View>
    );
};
