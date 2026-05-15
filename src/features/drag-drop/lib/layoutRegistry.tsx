import {TODO_ITEM_HEIGHT} from "@/features/todos/constants";

class LayoutRegistry {
    zones = new Map();

    registerZone(zone) {
        this.zones.set(zone.id, zone);
    }

    getZoneByY(y) {
        const bottomBuffer =
            TODO_ITEM_HEIGHT;

        for (const z of this.zones.values()) {
            if (
                y >= z.y &&
                y <= z.y + z.height + bottomBuffer
            ) {
                return z;
            }
        }
    }

    getIndex(zone, y, itemsIds = [], layouts = {}) {
        for (let i = 0; i < itemsIds.length; i++) {
            const layout = layouts[itemsIds[i]];

            if (!layout) continue;

            const center =
                layout.y + layout.height / 2;

            if (y < center) {
                return i;
            }
        }

        return itemsIds.length;
    }

    clear() {
        this.zones.clear();
    }
}

export const layoutRegistry = new LayoutRegistry();



