import { useMemo } from "react";

import { layoutRegistry } from "../../drag-drop/lib/layoutRegistry";
import { useDrag } from "@/features/drag-drop/model/DragProvider";
import { createDragEngine } from "@/features/todos/model/сreateDragEngine";
import { useDragStore } from "@/store/drag.store";
import {useTodoStore} from "@/store/todo.store";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export function useTodoDragController() {
    const insets = useSafeAreaInsets();
    const { x, y, overIndex, overCategory,setPreview, scrollYRef , reset} = useDrag();
    const normalizeY = (y) => y + scrollYRef.current - insets.top;

    const startDrag = useDragStore((s) => s.startDrag);
    const reorder = useTodoStore((s) => s.reorderTodos);
    const changeCategory = useTodoStore((s) => s.moveTodoToCategory);
    const resetStore = useDragStore((s) => s.reset);
    const setReordering = useDragStore((s) => s.setReordering);
    const engine = useMemo(() => createDragEngine(), []);
    const setAnchor = useDragStore((s) => s.setAnchor);

    engine.setHandlers({
        onGestureStart: () => {},

        onDragStart: (id, categoryId) => {
            startDrag(id, categoryId);

            const todos = useTodoStore.getState().todos;

            const inCategory = todos
                .filter(t => t.categoryId === categoryId);

            const index = inCategory.findIndex(t => t.id === id);

            setPreview({
                category: categoryId,
                index: index === -1 ? 0 : index,
            });
        },

        onMove: (px, py) => {
            x.value = px;
            y.value = py;

            const normalizedY = normalizeY(py);
            const zone = layoutRegistry.getZoneByY(normalizedY);

            if (!zone) return;

            const todosInZone = useTodoStore
                .getState()
                .todos.filter((t) => t.categoryId === zone.id);

            const index = layoutRegistry.getIndex(
                zone,
                normalizedY,
                todosInZone.map(t => t.id)
            );

            if (
                overCategory.value === zone.id &&
                overIndex.value === index
            ) {
                return;
            }

            overCategory.value = zone.id;
            overIndex.value = index;

            setPreview({
                category: zone.id,
                index,
            });
        },

        onEnd: () => {
            setReordering(true);
            const { activeId, fromCategory } = useDragStore.getState();
            const targetCategory = overCategory.value;
            const index = overIndex.value;

            if (!activeId || !targetCategory) return;

            const isSameCategory = fromCategory === targetCategory;

            if (isSameCategory) {
                reorder(activeId, index, targetCategory);
            } else {
                changeCategory(activeId, targetCategory, index);
            }


            resetStore();
            reset()

            requestAnimationFrame(() => {
                setReordering(false);
            });


        },
    });

    return {
        engine,
    };
}
