import { TODO_ITEM_HEIGHT } from "@/features/todos/constants";
import {Zone} from "@/features/drag-drop/model/type";
import {Layout} from "@/features/drag-drop/model/type";


type LayoutsMap = Record<string, Layout>;

export const resolveZoneByY = (
    y: number,
    categoryZones: Map<string, Zone>,
): Zone | null => {
    for (const zone of categoryZones.values()) {
        const zoneTop = zone.y;

        const zoneBottom =
            zoneTop + zone.height;

        const isInsideZone =
            y >= zoneTop &&
            y <= zoneBottom;

        if (isInsideZone) {
            return zone;
        }
    }

    return null;
};

export const resolveIndexByY = (
    y: number,
    items: string[] = [],
    activeId: string,
    layouts: LayoutsMap = {},
    zone: Zone,
): number => {
    let targetIndex = items.length;

    for (const [index, itemId] of items.entries()) {
        const layout = layouts[itemId];

        if (!layout) {
            continue;
        }

        const itemTop =
            zone.y + layout.y;

        const itemCenterY =
            itemTop + TODO_ITEM_HEIGHT / 2;

        const shouldInsertBefore =
            y < itemCenterY;

        if (shouldInsertBefore) {
            targetIndex = index;
            break;
        }
    }

    return targetIndex;
};
