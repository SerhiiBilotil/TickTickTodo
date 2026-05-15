
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDrag } from "@/features/drag-drop/model/DragProvider";
import {layoutRegistry} from "@/features/drag-drop/lib/layoutRegistry";
import {useDragState} from "@/features/drag-drop/model/useDragState";

export function useLayoutResolver() {
    const insets = useSafeAreaInsets();
    const { scrollYRef } = useDrag();
    const {layouts} = useDragState()

    const normalizeY = (y: number) => {
        return y + scrollYRef.current - insets.top;
    };

    const resolveZone = (y: number) => {
        const normalizedY = normalizeY(y);
        return layoutRegistry.getZoneByY(normalizedY);
    };

    const resolveIndex = (zone: any, y: number, itemsIds: string[]) => {
        const normalizedY = normalizeY(y);
        return layoutRegistry.getIndex(zone, normalizedY, itemsIds, layouts);
    };

    return {
        resolveZone,
        resolveIndex,
        normalizeY,
    };
}
