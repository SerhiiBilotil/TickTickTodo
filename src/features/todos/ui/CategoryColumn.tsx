import React, { useMemo } from "react";
import { View, LayoutChangeEvent } from "react-native";
import { Box } from "@/shared/ui/Box";
import { TodoItem } from "./TodoItem";
import { DropPlaceholder } from "@/features/todos/ui/DropPlaceholder";
import { useDragState } from "@/features/drag-drop/hooks/useDragState";
import { useDragStore } from "@/store/drag.store";
import { Category, Todo } from "@/features/todos/model/type";

type Props = {
    category: Category;
    todos: Todo[];
};

export const TodoCategoryColumn = ({ category, todos }: Props) => {
    const { previewCategory, previewIndex } = useDragState();

    const active = previewCategory === category.id;

    const setLayout = useDragStore(s => s.setLayout);

    const placeholderIndex = useMemo(() => {

        if (!active) return -1;

        return Math.min(Math.max(previewIndex ?? 0, 0), todos.length);

    }, [active, previewIndex, todos.length]);

    const handleLayout = (id: string, e: LayoutChangeEvent) => {
        const { x, y, width, height } = e.nativeEvent.layout;

        setLayout(id, { x, y, width, height });
    };

    return (
        <Box>
            <Box>
                {todos.map((todo, index) => {
                    const showPlaceholderBefore =
                        active && placeholderIndex === index;

                    return (
                        <React.Fragment key={todo.id}>
                            {showPlaceholderBefore && (
                                <DropPlaceholder
                                    index={index}
                                    categoryId={category.id}
                                />
                            )}

                            <View onLayout={e => handleLayout(todo.id, e)}>
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
