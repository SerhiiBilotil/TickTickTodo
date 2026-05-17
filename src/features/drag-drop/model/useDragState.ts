import { useShallow } from "zustand/react/shallow";
import {useDragStore} from "@/store/drag.store";

export function useDragState() {
    return useDragStore(
        useShallow((s) => ({
            startDrag: s.startDrag,
            setReordering: s.setReordering,
            layouts: s.layouts,
            categoryZones: s.categoryZones,
            previewCategory: s.previewCategory,
            previewIndex: s.previewIndex,
            setPreview: s.setPreview,
            reset: s.reset,
        }))
    );
}
