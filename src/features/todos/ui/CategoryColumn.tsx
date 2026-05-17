import React, { useMemo } from "react";
import { View } from "react-native";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { TodoItem } from "./TodoItem";
import { DropPlaceholder } from "@/features/todos/ui/DropPlaceholder";
import { useDragState } from "@/features/drag-drop/model/useDragState";
import { useDrag } from "@/features/drag-drop/model/DragProvider";
import { useDragStore } from "@/store/drag.store";

export const TodoCategoryColumn = ({ category, todos }) => {
    const { preview } = useDrag();

    const active = preview?.category === category.id;

    const { categoryZones } = useDragState();
    const zone = categoryZones?.[category.id];

    const setLayout = useDragStore((s) => s.setLayout);


    const placeholderIndex = useMemo(() => {
        if (!active) return -1;

        return Math.min(
            Math.max(preview?.index ?? 0, 0),
            todos.length
        );
    }, [active, preview?.index, todos.length]);

    return (
        <Box>



            <Box>
                {todos.map((todo, i) => {
                    const showPlaceholderBefore = active && placeholderIndex === i;

                    return (
                        <React.Fragment key={todo.id}>
                            {showPlaceholderBefore && (
                                <DropPlaceholder
                                    index={i}
                                    categoryId={category.id}
                                />
                            )}

                            <View
                                onLayout={(e) => {
                                    const layout = e.nativeEvent.layout;

                                    setLayout(todo.id, {
                                        x: layout.x,
                                        y: layout.y,
                                        width: layout.width,
                                        height: layout.height,
                                    });
                                }}
                            >
                                <TodoItem todo={todo} />
                            </View>
                        </React.Fragment>
                    );
                })}

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
