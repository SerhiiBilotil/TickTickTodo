import React from "react";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";

import { TodoItem } from "./TodoItem";
import { DropPlaceholder } from "@/features/todos/ui/DropPlaceholder";

import { useDrag } from "@/features/drag-drop/model/DragProvider";

export const TodoCategoryColumn = ({ category, todos }) => {
    const { preview } = useDrag();

    const active = preview.category === category.id;
    const placeholderIndex = active ? preview.index : -1;

    return (
        <Box marginBottom="l">
            <Text variant="categoryTitle" marginBottom="s">
                {category.title}
            </Text>

            <Box >
                {todos.map((todo, i) => (
                    <React.Fragment key={todo.id}>
                        {active && placeholderIndex === i && (
                            <DropPlaceholder
                                index={i}
                                categoryId={category.id}
                            />
                        )}

                        <TodoItem todo={todo} />
                    </React.Fragment>
                ))}

                {active && placeholderIndex === todos.length && (
                    <DropPlaceholder
                        index={todos.length}
                        categoryId={category.id}
                    />
                )}
            </Box>
        </Box>
    );
};
