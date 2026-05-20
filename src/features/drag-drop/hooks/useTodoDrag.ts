import { useDragStore } from "@/store/drag.store";
import { useDragState } from "./useDragState";
import { useTodoReorder } from "../../todos/hooks/useTodoReorder";
import { resolveIndexByY, resolveZoneByY } from "@/features/drag-drop/lib/drag-resolver";
import { getZoneData, finishDrag, getCategoryTodoIds } from "@/features/drag-drop/lib/drag.utils";

import {dragX, dragY, initialDragX, initialDragY} from "../model/drag.shared";
import {useTodoStore} from "@/store/todo.store";

export function useTodoDrag() {
    const { startDrag, reset, setReordering, layouts, categoryZones, setPreview } = useDragState();

    const { reorder, changeCategory } = useTodoReorder();
    const todos = useTodoStore.getState().todos;
    const zones = Object.values(categoryZones);



    const start = (id: string, categoryId: string) => {

        const data = getZoneData(id, categoryId, layouts, categoryZones);

        if (!data) return;

        const { layout, zone } = data;

        dragX.value = layout.x;
        dragY.value = layout.y + zone.y;

        initialDragX.value = layout.x;
        initialDragY.value = layout.y + zone.y;

        const index = getCategoryTodoIds(categoryId, todos)
            .findIndex(itemId => itemId === id);

    };

    const move = (
        id: string,
        categoryId: string,
        dx: number,
        dy: number,
    ) => {
        startDrag(id, categoryId);
        const data = getZoneData(id, categoryId, layouts, categoryZones);

        if (!data) return;

        const { layout, zone } = data;

        dragX.value = initialDragX.value + dx;
        dragY.value = initialDragY.value + dy;

        const centerY = dragY.value + layout.height / 2;

        const targetZone = resolveZoneByY(centerY, zones);

        if (!targetZone) return;

        const items = getCategoryTodoIds(targetZone.id, todos);

        const index = resolveIndexByY(centerY, items, id, layouts, targetZone);

        setPreview(targetZone.id, Math.max(index, 0));
    };

    const end = (cancelled: boolean) => {
        setReordering(true);
        const finish = () => finishDrag(reset, setReordering);

        if (cancelled) return requestAnimationFrame(finish);

        const {
            activeId,
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
    };

    return { start, move, end };
}
