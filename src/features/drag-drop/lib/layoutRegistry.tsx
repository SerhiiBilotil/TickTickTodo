import {TODO_ITEM_HEIGHT} from "@/features/todos/constants";

class LayoutRegistry {
    zones = new Map();

    registerZone(zone) {
        this.zones.set(zone.id, zone);
    }

    getZoneByY(y) {
        for (const z of this.zones.values()) {
            if (y >= z.y && y <= z.y + z.height) return z;
        }
    }

    getIndex(zone, y, itemsIds = []) {
        const localY = y - zone.y;

        const clampedY = Math.max(0, localY);

        const index = Math.round(clampedY / TODO_ITEM_HEIGHT);

        return Math.max(
            0,
            Math.min(itemsIds.length, index)
        );
    }

    clear() {
        this.zones.clear();
    }
}

export const layoutRegistry = new LayoutRegistry();


// getIndex(zone, y, itemsIds = []) {
//
//
//     const localY = y - zone.y;
//
//     if (localY <= TODO_ITEM_HEIGHT / 2) {
//         return 0;
//     }
//     const index = Math.floor(localY / TODO_ITEM_HEIGHT);
//
//     return Math.max(
//         0,
//         Math.min(itemsIds.length, index)
//     );
// }
