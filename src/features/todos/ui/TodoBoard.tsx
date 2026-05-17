import React, {useEffect, useRef} from "react";
import {ScrollView, View} from "react-native";
import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { TodoCategoryColumn } from "./CategoryColumn";
import { useTodoStore } from "@/store/todo.store";
import { selectGroupedTodos } from "@/store/todo.selectors";
import {DragOverlay} from "@/features/drag-drop/ui/DragOverlay";
import {DropZone} from "@/features/todos/ui/DropZone";

export const TodoBoard = () => {
    const todos = useTodoStore((state) => state.todos);
    const categories = useTodoStore((state) => state.categories);
    const grouped = selectGroupedTodos(todos, categories);
    const scrollRef = useRef(null);


    return (
        <ScrollView
                    ref={scrollRef}
                    contentContainerStyle={{ padding: 16 }}
                    scrollEnabled={true}
                    nestedScrollEnabled={false}

        >
            <Text variant="title" marginBottom="m">
                My Tasks
            </Text>
            <Box>

                {grouped.map((category) => (
                    <React.Fragment key={category.id}>
                        <Text variant="categoryTitle" marginBottom="s">
                            {category.title}
                        </Text>
                        <DropZone key={category.id} categoryId={category.id}>

                            <TodoCategoryColumn
                                category={category}
                                todos={category.todos}
                            />
                        </DropZone>
                    </React.Fragment>

                ))}
                <DragOverlay />
            </Box>

        </ScrollView>
    );
};
