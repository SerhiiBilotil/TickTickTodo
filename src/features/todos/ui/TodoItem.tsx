import React, { useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {LinearTransition, runOnJS, useAnimatedStyle,} from "react-native-reanimated";
import {Gesture, GestureDetector,} from "react-native-gesture-handler";
import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { useDragStore } from "@/store/drag.store";
import { TODO_ITEM_HEIGHT } from "@/features/todos/constants";
import { useTodoDrag } from "@/features/drag-drop/hooks/useTodoDrag";
import { Todo } from "@/features/todos/model/type";

type Props = {
    todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
    const drag = useTodoDrag();

    const itemRef = useRef<View>(null);
    const activeTodoId = useDragStore(s => s.activeId);
    const isReordering = useDragStore(s => s.isReordering);
    const isActive = activeTodoId === todo.id;

    const style = useAnimatedStyle(() => ({
        opacity: isActive ? 0 : 1,
        height: isActive ? 0 : TODO_ITEM_HEIGHT,
        zIndex: isActive ? 10 : 1,
        marginBottom: isActive ? 0 : 8,
    }));

    const gesture = useMemo(() =>
            Gesture.Pan()
                .onBegin(() => {
                    runOnJS(drag.start)(
                        todo.id,
                        todo.categoryId,
                    );
                })
                .onUpdate(e => {
                    runOnJS(drag.move)(
                        todo.id,
                        todo.categoryId,
                        e.translationX,
                        e.translationY,
                    );
                })
                .onFinalize(() => {
                    runOnJS(drag.end)(false);
                }),
        [drag]);

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
