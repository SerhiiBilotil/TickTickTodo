import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import React, {useEffect} from "react";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";


import { useDragStore } from "@/store/drag.store";
import { useTodoStore } from "@/store/todo.store";
import {TODO_ITEM_HEIGHT} from "@/features/todos/constants";
import {dragX, dragY} from "@/features/drag-drop/model/drag.shared";

export const DragOverlay = () => {


    const activeId = useDragStore((s) => s.activeId);
    const layouts = useDragStore((s) => s.layouts);
    const layout = activeId ? layouts[activeId] : null;

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
            height: TODO_ITEM_HEIGHT,
            transform: visible
                ? [
                    { translateX: dragX.value },
                    { translateY: dragY.value  },
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
                width={layout?.width}
                height={TODO_ITEM_HEIGHT}
                style={{ flex: 0,  justifyContent: "center",paddingHorizontal: 12 }}
                borderRadius="m"
                backgroundColor="card"
            >
                <Text>{todo.title}</Text>
            </Box>
        </Animated.View>
    );
};
