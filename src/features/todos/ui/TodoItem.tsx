import React, { useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    LinearTransition,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {
    Gesture,
    GestureDetector,
    GestureType
} from "react-native-gesture-handler";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { useDragStore } from "@/store/drag.store";
import { TODO_ITEM_HEIGHT } from "@/features/todos/constants";
import { useTodoDrag } from "@/features/drag-drop/hooks/useTodoDrag";
import { Todo } from "@/features/todos/model/type";
import {scheduleOnRN} from "react-native-worklets";

type Props = {
    todo: Todo;
    scrollGesture: GestureType;
};

export const TodoItem = ({ todo, scrollGesture }: Props) => {
    const drag = useTodoDrag();

    const itemRef = useRef<View>(null);

    const activeTodoId = useDragStore(s => s.activeId);
    const isReordering = useDragStore(s => s.isReordering);

    const isActive = activeTodoId === todo.id;

    const scale = useSharedValue(1);
    const isDragging = useSharedValue(false);

    const style = useAnimatedStyle(() => ({
        opacity: isActive ? 0 : 1,
        height: isActive ? 0 : TODO_ITEM_HEIGHT,
        zIndex: isActive ? 10 : 1,
        marginBottom: isActive ? 0 : 8,
        transform: [
            {
                scale: scale.value,
            },
        ],
    }));

    const longPress = Gesture.LongPress()
        .minDuration(250)
        .onStart(() => {
            isDragging.value = true;

            scale.value = withTiming(1.05, {
                duration: 150,
            });

            scheduleOnRN(
                drag.start,
                todo.id,
                todo.categoryId,
            );
        });

    const pan = Gesture.Pan()
        .shouldCancelWhenOutside(false)
        .simultaneousWithExternalGesture(scrollGesture)
        .activeOffsetY([-10, 10])
        .onUpdate(e => {
            if (!isDragging.value) return;

            scheduleOnRN(
                drag.move,
                todo.id,
                todo.categoryId,
                e.translationX,
                e.translationY,
            );
        })
        .onFinalize(() => {
            if (!isDragging.value) return;

            isDragging.value = false;

            scale.value = withTiming(1, {
                duration: 150,
            });

            scheduleOnRN(
                drag.end,
                false,
            );
        });

    const gesture = Gesture.Simultaneous(
        longPress,
        pan,
    );

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                ref={itemRef}
                collapsable={false}
                layout={isReordering ? undefined : LinearTransition}
                style={style}
            >
                <Box
                    paddingHorizontal="m"
                    borderRadius="m"
                    backgroundColor="card"
                    style={styles.content}
                >
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {todo.title}
                    </Text>
                </Box>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "card",
        borderRadius: 12,
        paddingHorizontal: 12,
    },
});
