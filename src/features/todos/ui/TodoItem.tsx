import React, {useMemo} from "react";
import Animated, {
    EntryExitTransition,
    FadeIn,
    FadeOut,
    FadingTransition,
    LinearTransition,
    runOnJS,
    useAnimatedStyle
} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";

import { useTodoDragController } from "../model/useTodoDragController";
import {useDragStore} from "@/store/drag.store";
import {TODO_ITEM_HEIGHT} from "@/features/todos/constants";



export const TodoItem = ({ todo }) => {
    const { engine } = useTodoDragController();

    const activeTodoId = useDragStore((s) => s.activeId);
    const isReordering = useDragStore((s) => s.isReordering);
    const isActive = activeTodoId === todo.id;

    const style = useAnimatedStyle(() => ({
        opacity: isActive ? 0 : 1,
        height: isActive ? 0 : TODO_ITEM_HEIGHT,
        zIndex: isActive ? 10 : 1,
        marginBottom: isActive ? 0 : 8,
    }));

    const gesture = useMemo(() =>
            Gesture.Pan()
                .onBegin((e) => {
                    runOnJS(engine.start)(todo.id, todo.categoryId, e);
                })
                .onUpdate((e) => {
                    runOnJS(engine.move)(e);
                })
                .onEnd(() => {
                    runOnJS(engine.end)();
                })
        , [engine]);

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                layout={
                    isReordering
                        ? undefined
                        : LinearTransition
                }
                collapsable={false}
                style={style}
            >
                <Box paddingHorizontal="m"  borderRadius="m" backgroundColor="card" style={styles.content}>
                    <Text numberOfLines={1} ellipsizeMode="tail">{todo.title}</Text>
                </Box>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = {
    container: {
        height: TODO_ITEM_HEIGHT,
        overflow: "hidden",
    },

    content: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "card",
        borderRadius: 12,
        paddingHorizontal: 12,
    }
};
