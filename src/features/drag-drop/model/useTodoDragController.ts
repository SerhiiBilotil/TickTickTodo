import { useMemo } from "react";


import { useDragStore } from "@/store/drag.store";
import { useTodoStore } from "@/store/todo.store";


import { useDragState } from "./useDragState";
import { useTodoReorder } from "../../todos/model/useTodoReorder";

import { useDrag } from "@/features/drag-drop/model/DragProvider";
import {createDragEngine} from "@/features/drag-drop/model/сreateDragEngine";
import {resolveIndexByY, resolveZoneByY} from "@/features/drag-drop/lib/layoutRegistry";
import {data} from "browserslist";

export function useTodoDragController() {
    const engine = useMemo(() => createDragEngine(), []);

    const {
        x,
        y,
        overIndex,
        overCategory,
        setPreview,
        reset: resetDragProvider,
    } = useDrag();


    const { startDrag, reset, setReordering, anchorY, anchorX, setAnchor, layouts,categoryZones } = useDragState();
    const { reorder, changeCategory } = useTodoReorder();
    const titleHeight = 0

    engine.setHandlers({
        onGestureStart: (id, categoryId, e, ) => {
            startDrag(id, categoryId);


            const layout = layouts[id];
            if (!layout || layout.height === 0) {return}

            const activeZone = categoryZones[categoryId];

            x.value = layout.x
            y.value = layout.y + activeZone.y + titleHeight

            const todos = useTodoStore.getState().todos;

            const inCategory = todos.filter(t => t.categoryId === categoryId);

            const index = inCategory.findIndex(t => t.id === id);

            setPreview({
                category: categoryId,
                index: index === -1 ? 0 : index,
            });

        },
        onDragStart: (id, categoryId, e, startX, startY) => {



        },

        onMove: (id,categoryId, dx, dy,e) => {
            const layout = layouts[id];
            const activeZone = categoryZones[categoryId];

            if (!layout) return;

            x.value = layout.x + dx;
            y.value = layout.y + dy + activeZone.y + titleHeight

            const draggedCenterY =  y.value + layout.height/2


            const zone = resolveZoneByY(draggedCenterY, Object.values(categoryZones));
            console.log('zones', zone)
            if (!zone) return;

            const todos = useTodoStore.getState().todos;

            const items = todos
                .filter((t) => t.categoryId === zone.id)
                .map((t) => t.id);

            const index = resolveIndexByY(draggedCenterY, items, id, layouts, zone,);

            console.log('index', index);
            overCategory.value = zone.id;
            overIndex.value = index;


            setPreview({
                category: zone.id,
                index,
            });
        },

        onEnd: (resetState) => {
            setReordering(true);

            console.log('reset', resetState);

            const finish = () => {
                reset();
                resetDragProvider();
                setTimeout(() => {
                    setReordering(false);
                }, 200)
            };

            if (resetState) {
                requestAnimationFrame(finish);
                return;
            }

            const { activeId, fromCategory } =
                useDragStore.getState();

            const targetCategory = overCategory.value;
            const index = overIndex.value;

            if (!activeId || !targetCategory) {
                requestAnimationFrame(finish);
                return;
            }
                console.log('reorder',activeId, index, targetCategory);
            if (fromCategory === targetCategory) {
                reorder(activeId, index, targetCategory);
            } else {
                changeCategory(activeId, targetCategory, index);
            }

            requestAnimationFrame(finish);
        },
    });

    return { engine };
}
