
export type DragState = {
    activeId: string | null;
    fromCategory: string | null;
    isReordering: boolean;
    categoryZones: object;
};
export type Zone = {
    id: string;
    y: number;
    height: number;
};
export type Layout = {
    x: number;
    y: number;
    width: number;
    height: number;
};
export type CategoryZones = {
    id: string;
    y: number;
    height: number;
};

export type DragActions = {
    setReordering: (value: boolean) => void;
    startDrag: (id: string, categoryId: string) => void;
    setActive: (id: string, categoryId: string) => void;
    layouts: Record<string, Layout>;
    setLayout: (id: string, layout: Layout) => void;
    setCategoryZones: (id: string, layout: CategoryZones) => void;
    previewCategory: string | null;
    previewIndex: number | null;
    setPreview: (category: string | null, index: number | null) => void;
    reset: () => void;
};
