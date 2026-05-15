import { useMemo } from "react";


import { useDragStore } from "@/store/drag.store";
import { useTodoStore } from "@/store/todo.store";

import { useLayoutResolver } from "./useLayoutResolver";
import { useDragState } from "./useDragState";
import { useTodoReorder } from "../../todos/model/useTodoReorder";

import { useDrag } from "@/features/drag-drop/model/DragProvider";
import {createDragEngine} from "@/features/drag-drop/model/сreateDragEngine";

export function useTodoDragController() {
    const engine = useMemo(() => createDragEngine(), []);

    const {
        x,
        y,
        overIndex,
        overCategory,
        setPreview,
        scrollYRef,
        reset: resetDragProvider,
    } = useDrag();

    const { resolveZone, resolveIndex } = useLayoutResolver();
    const { startDrag, reset, setReordering, anchorY, anchorX, setAnchor, layouts, setNeedsLayoutSync} = useDragState();
    const { reorder, changeCategory } = useTodoReorder();

    engine.setHandlers({
        onGestureStart: () => {

        },
        onDragStart: (id, categoryId, e, startX, startY) => {
            startDrag(id, categoryId);

            const layout = layouts[id];
            if (!layout) return;


            setAnchor(
                e.absoluteX - layout.x,
                e.absoluteY - layout.y
            );

            x.value = startX;
            y.value =  startY;

            const todos = useTodoStore.getState().todos;

            const inCategory = todos.filter(
                t => t.categoryId === categoryId
            );

            const index = inCategory.findIndex(
                t => t.id === id
            );

            setPreview({
                category: categoryId,
                index: index === -1 ? 0 : index,
            });
        },

        onMove: (px, py) => {
            x.value = px;
            y.value = py;

            const zone = resolveZone(py);
            if (!zone) return;

            const todos = useTodoStore.getState().todos;

            const items = todos
                .filter((t) => t.categoryId === zone.id)
                .map((t) => t.id);

            const index = resolveIndex(zone, py, items);

            overCategory.value = zone.id;
            overIndex.value = index;


            setPreview({
                category: zone.id,
                index,
            });
        },

        onEnd: (resetState) => {
            setReordering(true);
            if(resetState){
                reset();
                resetDragProvider();
                requestAnimationFrame(() => {
                    setTimeout(() => setReordering(false),0);
                });
                return
            }

            const { activeId, fromCategory } = useDragStore.getState();

            const targetCategory = overCategory.value;
            const index = overIndex.value;

            if (!activeId || !targetCategory) return;

            if (fromCategory === targetCategory) {
                reorder(activeId, index, targetCategory);
            } else {
                changeCategory(activeId, targetCategory, index);
            }

            reset();
            resetDragProvider();

            requestAnimationFrame(() => {
                setTimeout(() => setReordering(false),0);
                setTimeout(() => {
                    setNeedsLayoutSync(Date.now());
                }, 250);
            });
        },
    });

    return { engine };
}
