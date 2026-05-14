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
        const ITEM_HEIGHT = 50;

        const localY = y - zone.y;

        if (localY <= ITEM_HEIGHT / 2) {
            return 0;
        }
        const index = Math.floor(localY / ITEM_HEIGHT);

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
