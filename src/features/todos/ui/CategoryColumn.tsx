import React from "react";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { TodoItem } from "./TodoItem";
import { DropZone } from "./DropZone";
import { useDrag } from "@/features/drag-drop/DragProvider";
import { DropPlaceholder } from "@/features/todos/ui/DropPlaceholder";
import { useDropPreview } from "@/features/drag-drop/useDropPreview";

export const TodoCategoryColumn = ({ category, todos }) => {
    const { overIndex, overCategory } = useDrag();

    const preview = useDropPreview(overCategory, overIndex);

    const isInCategory = preview.category === category.id;

    return (
        <Box marginBottom="l">
            <DropZone categoryId={category.id}>
                <Text variant="categoryTitle" marginBottom="s">
                    {category.title}
                </Text>

                <Box gap="s">
                    {todos.map((todo, index) => {
                        const showPlaceholder =
                            isInCategory && preview.index === index;

                        console.log('showPlaceholder', showPlaceholder);
                        return (
                            <React.Fragment key={todo.id}>
                                {showPlaceholder && <DropPlaceholder categoryId={category.id}
                                                                     index={index}
                                                                     overIndex={overIndex}
                                                                     overCategory={overCategory} />}

                                <TodoItem
                                    todo={todo}
                                    index={index}
                                    categoryId={category.id}
                                />
                            </React.Fragment>
                        );
                    })}

                    {isInCategory &&
                        preview.index === todos.length && (
                            <DropPlaceholder  categoryId={category.id}
                                              overIndex={overIndex}
                                              overCategory={overCategory}
                            />
                        )}
                </Box>
            </DropZone>
        </Box>
    );
};
