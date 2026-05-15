import React, {useEffect, useMemo, useRef, useState} from "react";
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

import { useTodoDragController } from "../../drag-drop/model/useTodoDragController";
import {useDragStore} from "@/store/drag.store";
import {TODO_ITEM_HEIGHT} from "@/features/todos/constants";
import {View} from "react-native";



export const TodoItem = ({ todo }) => {
    const { engine } = useTodoDragController();
    const itemRef = useRef(null);


    const activeTodoId = useDragStore((s) => s.activeId);
    const isReordering = useDragStore((s) => s.isReordering);
    const setLayout = useDragStore((s) => s.setLayout);
    const needsLayoutSync = useDragStore((s) => s.needsLayoutSync);
    const setNeedsLayoutSync = useDragStore((s) => s.setNeedsLayoutSync);
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
                    runOnJS(engine.start)(todo.id, todo.categoryId, e, );
                })
                .onUpdate((e) => {
                    runOnJS(engine.move)(e);
                })
                .onFinalize(() => {
                    runOnJS(engine.end)();
                })
        , [engine]);

    useEffect(() => {
        const id = todo.id;
        const timeout = setTimeout(() => {
            if (!itemRef.current) return;

            itemRef.current.measureInWindow((x, y, width, height) => {
                console.log('setLayout',todo.id, x, y);
                setLayout(id, { x, y, width, height });
            });
        }, 100);

        return () => clearTimeout(timeout);
    }, [todo.id]);

    useEffect(() => {
        if (!needsLayoutSync) return;
        if (isActive) return;
        itemRef.current?.measureInWindow(
            (x, y, width, height) => {
                console.log('syncLayoutSync',todo.id, x, y);
                setLayout(todo.id, {
                    x,
                    y,
                    width,
                    height,
                });
            }
        );
    }, [needsLayoutSync]);


    return (
        <GestureDetector gesture={gesture}>
            <Animated.View
                ref={itemRef}
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
