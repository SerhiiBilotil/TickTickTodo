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

const ITEM_HEIGHT = 50;

export const TodoItem = ({ todo }) => {
    const { engine } = useTodoDragController();

    const activeTodoId = useDragStore((s) => s.activeId);

    const isActive = activeTodoId === todo.id;

    const style = useAnimatedStyle(() => ({
        opacity: isActive ? 0 : 1,
        height: isActive ? 0 : 50,
        zIndex: isActive ? 999 : 1,
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
                layout={LinearTransition}
                collapsable={false}
                style={style}
            >
                <Box padding="m" borderRadius="m" backgroundColor="card">
                    <Text numberOfLines={1} ellipsizeMode="tail">{todo.title}</Text>
                </Box>
            </Animated.View>
        </GestureDetector>
    );
};
