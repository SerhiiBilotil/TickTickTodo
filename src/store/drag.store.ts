import { create } from "zustand";

type DragState = {
    activeId: string | null;
    fromCategory: string | null;
};

type DragActions = {
    startDrag: (id: string, categoryId: string) => void;
    setActive: (id: string | null) => void;
    reset: () => void;
};

export const useDragStore = create<DragState & DragActions>((set) => ({
    activeId: null,
    fromCategory: null,

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
}));
