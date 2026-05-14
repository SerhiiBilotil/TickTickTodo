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

    const engine = useMemo(() => createDragEngine(), []);

    engine.setHandlers({
        onGestureStart: () => {},

        onDragStart: (id, categoryId) => {
            startDrag(id, categoryId);
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
            const { activeId, fromCategory } = useDragStore.getState();
            // layoutRegistry.clear()
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

            x.value = 0;
            y.value = 0;
            overCategory.value = null;
            overIndex.value = null;

        },
    });

    return {
        engine,
    };
}
