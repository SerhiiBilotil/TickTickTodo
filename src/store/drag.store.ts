import { create } from "zustand";
import {DragActions, DragState} from '@/features/drag-drop/model/type'


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
