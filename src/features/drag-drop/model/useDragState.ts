import { useDragStore } from "@/store/drag.store";

export function useDragState() {
    const startDrag = useDragStore((s) => s.startDrag);
    const reset = useDragStore((s) => s.reset);
    const setReordering = useDragStore((s) => s.setReordering);
    const layouts = useDragStore((s) => s.layouts);
    const needsLayoutSync = useDragStore((s) => s.needsLayoutSync);
    const setNeedsLayoutSync = useDragStore((s) => s.setNeedsLayoutSync);
    const anchorX = useDragStore((s) => s.anchorX);
    const anchorY = useDragStore((s) => s.anchorY);
    const setAnchor = useDragStore((s) => s.setAnchor);

    return {
        startDrag,
        reset,
        setReordering,

        anchorX,
        anchorY,
        setAnchor,
        layouts,
        needsLayoutSync,
        setNeedsLayoutSync
    };
}
