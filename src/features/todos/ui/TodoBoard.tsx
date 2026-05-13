import React from "react";
import { ScrollView } from "react-native";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { TodoCategoryColumn } from "./CategoryColumn";

import { useTodoStore } from "@/store/store";
import { selectGroupedTodos } from "@/store/todo.selectors";
import {DragOverlay} from "@/features/drag-drop/ui/DragOverlay";
import {useSharedValue} from "react-native-reanimated";

export const TodoBoard = () => {
    const todos = useTodoStore((state) => state.todos);
    const categories = useTodoStore((state) => state.categories);
    const grouped = selectGroupedTodos(todos, categories);



    return (
        <ScrollView   contentContainerStyle={{ padding: 16 , marginTop: 50,}}
                    scrollEnabled={true}
                    nestedScrollEnabled={false}

        >
            <Box>
                <Text variant="title" marginBottom="m">
                    My Tasks
                </Text>

                {grouped.map((category) => (
                    <TodoCategoryColumn
                        key={category.id}
                        category={category}
                        todos={category.todos}
                    />
                ))}

            </Box>
        </ScrollView>
    );
};
