import { useDragStore } from "@/store/drag.store";

export function useDragState() {
    const startDrag = useDragStore((s) => s.startDrag);
    const reset = useDragStore((s) => s.reset);
    const setReordering = useDragStore((s) => s.setReordering);
    const layouts = useDragStore((s) => s.layouts);
    const anchorX = useDragStore((s) => s.anchorX);
    const anchorY = useDragStore((s) => s.anchorY);
    const setAnchor = useDragStore((s) => s.setAnchor);


    const scrollContainerTop = useDragStore((s) => s.scrollContainerTop);
    const scrollOffset = useDragStore((s) => s.scrollY);
    const categoryLayouts = useDragStore((s) => s.categoryLayouts);
    const setCategoryLayout = useDragStore((s) => s.setCategoryLayout);
    const categoryZones = useDragStore((s) => s.categoryZones);


    return {
        startDrag,
        reset,
        setReordering,

        anchorX,
        anchorY,
        setAnchor,
        layouts,
        //content coord
        scrollContainerTop,
        scrollOffset,
        categoryLayouts,
        setCategoryLayout,
        categoryZones,

    };
}
