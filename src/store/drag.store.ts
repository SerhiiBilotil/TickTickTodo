import { create } from "zustand";

type DragState = {
    activeId: string | null;
    fromCategory: string | null;
    isReordering: boolean;
    anchorX: number;
    anchorY: number;
};

type DragActions = {
    setReordering: (value: boolean) => void;
    setAnchor: (value: boolean) => void;
    startDrag: (id: string, categoryId: string) => void;
    setActive: (id: string | null) => void;

    reset: () => void;
};

export const useDragStore = create<DragState & DragActions>((set) => ({
    activeId: null,
    fromCategory: null,
    isReordering: false,
    anchorX: 0,
    anchorY: 0,


    setReordering: (value) =>
        set({
            isReordering: value,
        }),

    startDrag: (id, categoryId) =>
        set({
            activeId: id,
            fromCategory: categoryId,
        }),

    setActive: (id) =>
        set({
            activeId: id,
        }),

    reset: () =>
        set({
            activeId: null,
            fromCategory: null,
        }),
    setAnchor: (x, y) =>
        set({
            anchorX: x,
            anchorY: y,
        }),

}));
