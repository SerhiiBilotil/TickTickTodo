import React, {useEffect} from "react";
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

export const TodoBoard = () => {
    const todos = useTodoStore((state) => state.todos);
    const categories = useTodoStore((state) => state.categories);
    const grouped = selectGroupedTodos(todos, categories);
    const { setScrollY, preview } = useDrag();


    return (
        <ScrollView
                    contentContainerStyle={{ padding: 16 }}
                    scrollEnabled={true}
                    nestedScrollEnabled={false}
                    onScroll={(e) => {
                        setScrollY(
                            e.nativeEvent.contentOffset.y
                        );
                    }}

        >
            <Box>
                <Text variant="title" marginBottom="m">
                    My Tasks
                </Text>

                {grouped.map((category) => (
                    <DropZone key={category.id} categoryId={category.id}>
                        <TodoCategoryColumn
                            category={category}
                            todos={category.todos}
                        />
                    </DropZone>
                ))}

            </Box>
        </ScrollView>
    );
};
