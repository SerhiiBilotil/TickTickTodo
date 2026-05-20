
import { resetDragShared } from "@/features/drag-drop/model/drag.shared";
import {Layout} from "@react-navigation/elements";
import {Zone} from "@/features/drag-drop/model/type";
import {Todo} from "@/features/todos/model/type";


type LayoutsMap = Record<string, Layout>;

type ZonesMap = Record<string, Zone>;

export const getZoneData = (
    id: string,
    categoryId: string,
    layouts: LayoutsMap,
    categoryZones: ZonesMap,
): { layout: Layout; zone: Zone } | null => {
    const layout = layouts[id];
    const zone = categoryZones[categoryId];

    if (!layout || !zone) return null;

    return { layout, zone };
};

export const finishDrag = (
    reset: () => void,
    setReordering: (value: boolean) => void,
) => {
    reset();
    resetDragShared();
    setTimeout(() => setReordering(false), 200);
};

export const getCategoryTodoIds = (
    categoryId: string,
    todos: Todo[],
): string[] => {

    return todos
        .filter(todo => todo.categoryId === categoryId)
        .map(todo => todo.id);
};
