import { useRef } from "react";
import { runOnJS, withSpring, useSharedValue } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";

import { useTodoDrag } from "../model/useTodoDrag";
import { useDrag } from "@/features/drag-drop/DragProvider";
import { getIndexByY, getZoneByY } from "@/features/drag-drop/useDropZones";

const ITEM_HEIGHT = 55;
const DRAG_THRESHOLD = 8;

export const useTodoDragController = ({ todo }) => {
    const { startDrag, endDrag } = useTodoDrag();
    const { x, y, resetPointer, overIndex, overCategory } = useDrag();

    const scale = useSharedValue(1);
    const isDraggingLocal = useSharedValue(false);
    const startY = useSharedValue(0);
    const startX = useSharedValue(0);

    const currentZone = useSharedValue(null);
    const currentIndex = useSharedValue(null);

    const lastRef = useRef({
        category: null,
        index: null,
    });

    const gesture = Gesture.Pan()
        .onBegin((e) => {
            startY.value = e.absoluteY;
            startX.value = e.absoluteX;
            isDraggingLocal.value = false;

            x.value = e.absoluteX;
            y.value = e.absoluteY;
        })

        .onUpdate((e) => {
            const distance = Math.hypot(e.absoluteX - startX.value, e.absoluteY - startY.value)

            if (!isDraggingLocal.value && distance > DRAG_THRESHOLD) {
                isDraggingLocal.value = true;
                runOnJS(startDrag)(todo.id);
                scale.value = withSpring(1.05);
            }

            if (!isDraggingLocal.value) return;

            x.value = e.absoluteX;
            y.value = e.absoluteY;

            const zone = getZoneByY(e.absoluteY);
            if (!zone) return;

            const localY = e.absoluteY - zone.y;
            const nextIndex = getIndexByY(localY, ITEM_HEIGHT, 3);

            currentZone.value = zone.id;
            currentIndex.value = nextIndex;

            if (
                lastRef.current.category === zone.id &&
                lastRef.current.index === nextIndex
            ) {
                return;
            }

            lastRef.current = {
                category: zone.id,
                index: nextIndex,
            };

            overCategory.value = zone.id;
            overIndex.value = nextIndex;
        })

        .onEnd(() => {
            if (!isDraggingLocal.value) return;

            runOnJS(endDrag)({
                categoryId: currentZone.value,
                index: currentIndex.value,
            });

            currentZone.value = null;
            currentIndex.value = null;
            isDraggingLocal.value = false;

            runOnJS(resetPointer)();

            scale.value = withSpring(1);
        });

    return {
        gesture,
        scale,
    };
};
