import { useEffect, useMemo } from "react";

import { useDragStore } from "@/store/drag.store";
import { useDragState } from "./useDragState";
import { useTodoReorder } from "../../todos/hooks/useTodoReorder";

import { createDragEngine } from "@/features/drag-drop/model/сreateDragEngine";
import { resolveIndexByY, resolveZoneByY } from "@/features/drag-drop/lib/layoutRegistry";

import { dragX, dragY, resetDragShared } from "./drag.shared";
import {todoStore} from "@/features/todos/model/todo.store.helpers";

export function useTodoDragController() {
    const engine = useMemo(() => createDragEngine(), []);

    const {startDrag, reset, setReordering, layouts, categoryZones, setPreview,} = useDragState();

    const { reorder, changeCategory } = useTodoReorder();

    useEffect(() => {
        const zones = Object.values(categoryZones);

        const getZoneData = (id: string, categoryId: string) => {
            const layout = layouts[id];
            const zone = categoryZones[categoryId];
            if (!layout || !zone) return null;
            return { layout, zone };
        };

        const getCategoryItems = (categoryId: string) => {
            return todoStore.todos
                .filter(todo => todo.categoryId === categoryId)
                .map(todo => todo.id);
        };

        engine.setHandlers({
            onGestureStart: (id, categoryId) => {
                startDrag(id, categoryId);

                const data = getZoneData(id, categoryId);

                if (!data) return;

                const { layout, zone } = data;

                dragX.value = layout.x;
                dragY.value = layout.y + zone.y;

                const index = getCategoryItems(categoryId).findIndex(t => t === id);

                setPreview(categoryId, Math.max(index, 0));
            },

            onMove: (id, categoryId, dx, dy) => {
                const data = getZoneData(id, categoryId);

                if (!data) return;

                const { layout, zone } = data;

                dragX.value = layout.x + dx;
                dragY.value = layout.y + dy + zone.y;

                const centerY = dragY.value + layout.height / 2;

                const targetZone = resolveZoneByY(centerY, zones);

                if (!targetZone) return;

                const items = getCategoryItems(targetZone.id);

                const index = resolveIndexByY(centerY, items, id, layouts, targetZone);

                setPreview(targetZone.id, Math.max(index, 0));
            },

            onEnd: (cancelled) => {
                setReordering(true);

                const finish = () => {
                    reset();
                    resetDragShared();
                    setTimeout(() => setReordering(false), 200);
                };

                if (cancelled) return requestAnimationFrame(finish);

                const {activeId,
                    fromCategory,
                    previewCategory,
                    previewIndex,
                } = useDragStore.getState();

                if (!activeId || !previewCategory) {
                    return requestAnimationFrame(finish);
                }

                if (fromCategory === previewCategory) {
                    reorder(activeId, previewIndex, previewCategory);
                } else {
                    changeCategory(activeId, previewCategory, previewIndex);
                }

                requestAnimationFrame(finish);
            },
        });
    }, [layouts, categoryZones]);

    return { engine };
}
