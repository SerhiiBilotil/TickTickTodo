import { create } from "zustand";

type UIState = {
    isCreateModalOpen: boolean;
    openCreateModal: () => void;
    closeCreateModal: () => void;

    isCategoryModalOpen: boolean;
    openCategoryModal: () => void;
    closeCategoryModal: () => void;
};

export const useUIStore = create<UIState>((set) => ({
    isCreateModalOpen: false,
    openCreateModal: () =>
        set({ isCreateModalOpen: true }),
    closeCreateModal: () =>
        set({ isCreateModalOpen: false }),

    isCategoryModalOpen: false,
    openCategoryModal: () =>
        set({ isCategoryModalOpen: true }),
    closeCategoryModal: () =>
        set({ isCategoryModalOpen: false }),
}));
