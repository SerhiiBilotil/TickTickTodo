import { create } from "zustand";

type DragState = {
    activeId: string | null;
    fromCategory: string | null;
    isReordering: boolean;
    anchorX: number;
    anchorY: number;
    needsLayoutSync: boolean;
};
type Layout = {
    x: number;
    y: number;
    width: number;
    height: number;
};
type DragActions = {
    setReordering: (value: boolean) => void;
    setNeedsLayoutSync: (value: boolean) => void;
    setAnchor: (x: number, y: number) => void;
    startDrag: (id: string, categoryId: string) => void;
    setActive: (id: string, categoryId: string) => void;
    layouts: Record<string, Layout>;
    setLayout: (id: string, layout: Layout) => void;
    reset: () => void;
};

export const useDragStore = create<DragState & DragActions>((set) => ({
    activeId: null,
    fromCategory: null,
    isReordering: false,
    needsLayoutSync: false,
    anchorX: 0,
    anchorY: 0,
    layouts: {},

    setNeedsLayoutSync: (v: boolean) =>
        set({ needsLayoutSync: v }),

    setLayout: (id, layout) =>
        set((state) => {
            state.layouts[id] = layout;
            return { layouts: state.layouts };
        }),


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
            anchorX: 0,
            anchorY: 0,
        }),
    setAnchor: (x, y) =>
        set({
            anchorX: x,
            anchorY: y,
        }),

}));
