import {makeMutable} from "react-native-reanimated";

type DropZoneType = {
    id: string;
    y: number;
    height: number;
};

export const zones = makeMutable<DropZoneType[]>([]);
let zonesSnapshot: DropZoneType[] = [];

export const registerZone = (id: string, y: number, height: number) => {
    const withoutOld = zonesSnapshot.filter((z) => z.id !== id);

    const next = [
        ...withoutOld,
        { id, y, height },
    ].sort((a, b) => a.y - b.y);

    zonesSnapshot = next;
    zones.value = next;

};

export const getZoneByY = (y: number) => {
    "worklet";

    const list = zones.value;

    for (let i = 0; i < list.length; i++) {
        const z = list[i];

        if (y >= z.y && y < z.y + z.height) {
            console.log('zone', z)
            return z;
        }
    }

    return null;
};

export const getIndexByY = (
    y: number,
    itemHeight: number,
    itemsCount: number
) => {
    "worklet";

    const index = Math.floor(y / itemHeight);
    console.log("index", index);
    if (index < 0) return 0;
    if (index > itemsCount) return itemsCount;

    return index;
};
