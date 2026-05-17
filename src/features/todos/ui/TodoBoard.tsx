import React, {useEffect, useRef} from "react";
import { ScrollView } from "react-native";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { TodoCategoryColumn } from "./CategoryColumn";

import { useTodoStore } from "@/store/todo.store";
import { selectGroupedTodos } from "@/store/todo.selectors";
import {DragOverlay} from "@/features/drag-drop/ui/DragOverlay";
import {useSharedValue} from "react-native-reanimated";
import {DropZone} from "@/features/todos/ui/DropZone";
import {useDrag} from "@/features/drag-drop/model/DragProvider";
import {useDragStore} from "@/store/drag.store";

export const TodoBoard = () => {
    const todos = useTodoStore((state) => state.todos);
    const categories = useTodoStore((state) => state.categories);
    const grouped = selectGroupedTodos(todos, categories);
    const {  preview } = useDrag();


    const scrollRef = useRef(null);


    const setScrollContainerTop = useDragStore((s) => s.setScrollContainerTop);
    const setScrollY = useDragStore((s) => s.setScrollY);

    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.measureInWindow(
                (x, y) => {
                    setScrollContainerTop(y);
                }
            );
        }, 0);
    }, []);

    return (
        <ScrollView
                    ref={scrollRef}
                    contentContainerStyle={{ padding: 16 }}
                    scrollEnabled={true}
                    nestedScrollEnabled={false}
                    onScroll={(e) => {
                        setScrollY(
                            e.nativeEvent.contentOffset.y
                        );
                    }}

        >
            <Text variant="title" marginBottom="m">
                My Tasks
            </Text>
            <Box>

                {grouped.map((category) => (
                    <>
                        <Text variant="categoryTitle" marginBottom="s">
                            {category.title}
                        </Text>
                        <DropZone key={category.id} categoryId={category.id}>

                            <TodoCategoryColumn
                                category={category}
                                todos={category.todos}
                            />
                        </DropZone>
                    </>

                ))}
                <DragOverlay />
            </Box>

        </ScrollView>
    );
};
