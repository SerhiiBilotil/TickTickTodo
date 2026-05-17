import {TODO_ITEM_HEIGHT} from "@/features/todos/constants";

export function resolveZoneByY(
    y,
    categoryZones
) {
    const bottomBuffer =
        TODO_ITEM_HEIGHT;

    console.log('data zones', y, categoryZones);


    for (const z of categoryZones.values()) {
        if (
            y >= z.y &&
            y <= z.y + z.height
        ) {
            return z;
        }
    }
}



export function resolveIndexByY(
    y,
    items = [],
    activeId,
    layouts = {},
    zone,
) {
    let index = items.length;

    for (let i = 0; i < items.length; i++) {
        const layout = layouts[items[i]];
        console.log('layout', layout);
        if (!layout) continue;

        const center = zone.y +  layout.y + 25;
        console.log('yy', y, center)
        if (y < center) {
            index = i;
            break;
        }
    }

    return index;
}
