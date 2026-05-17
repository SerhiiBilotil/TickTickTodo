import { create } from "zustand";

type DragState = {
    activeId: string | null;
    fromCategory: string | null;
    isReordering: boolean;
    anchorX: number;
    anchorY: number;
    scrollContainerTop: number;
    scrollY: number;
    categoryLayouts: object;
    categoryZones: object;
};
type Layout = {
    x: number;
    y: number;
    width: number;
    height: number;
};
type CategoryLayout = {
    y: number;
    height: number;
};
type DragActions = {
    setReordering: (value: boolean) => void;
    setScrollContainerTop: (value: number) => void;
    setScrollY: (value: number) => void;
    setAnchor: (x: number, y: number) => void;
    startDrag: (id: string, categoryId: string) => void;
    setActive: (id: string, categoryId: string) => void;
    layouts: Record<string, Layout>;

    setLayout: (id: string, layout: Layout) => void;
    setCategoryLayout: (id: string, layout: CategoryLayout) => void;
    setCategoryZones: (id: string, layout: CategoryLayout) => void;
    reset: () => void;
};

export const useDragStore = create<DragState & DragActions>((set) => ({
    activeId: null,
    fromCategory: null,
    isReordering: false,
    anchorX: 0,
    anchorY: 0,
    layouts: {},
    scrollContainerTop: 0,
    scrollY: 0,
    categoryLayouts: {},
    categoryZones: {},

    setCategoryZones: (id, layout) =>
        set((state) => ({
            categoryZones: {
                ...state.categoryZones,
                [id]: layout,
            },
        })),

    setCategoryLayout: (
        id: string,
        layout: {
            y: number;
            height: number;
        }
    ) =>
        set((state) => ({
            categoryLayouts: {
                ...state.categoryLayouts,
                [id]: layout,
            },
        })),

    setScrollContainerTop: (y: number) =>
        set({ scrollContainerTop: y }),

    setScrollY: (y: number) =>
        set({ scrollY: y }),


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
