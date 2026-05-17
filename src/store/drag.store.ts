import { create } from "zustand";

type DragState = {
    activeId: string | null;
    fromCategory: string | null;
    isReordering: boolean;
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
    startDrag: (id: string, categoryId: string) => void;
    setActive: (id: string, categoryId: string) => void;
    layouts: Record<string, Layout>;
    setLayout: (id: string, layout: Layout) => void;
    setCategoryZones: (id: string, layout: CategoryLayout) => void;
    previewCategory: string | null;
    previewIndex: number | null;
    setPreview: (category: string | null, index: number | null) => void;
    reset: () => void;
};

export const useDragStore = create<DragState & DragActions>((set) => ({
    activeId: null,
    fromCategory: null,
    isReordering: false,
    layouts: {},
    categoryZones: {},
    previewCategory: null,
    previewIndex: null,

    setPreview: (category, index) =>
        set({
            previewCategory: category,
            previewIndex: index,
        }),

    setCategoryZones: (id, layout) =>
        set((state) => ({
            categoryZones: {
                ...state.categoryZones,
                [id]: layout,
            },
        })),

    setLayout: (id, layout) =>
        set((state) => ({
            layouts: {
                ...state.layouts,
                [id]: layout,
            },
        })),

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

    reset: () => {
        set({
            activeId: null,
            fromCategory: null,
            previewCategory: null,
            previewIndex: null,
        });
    }

}));
