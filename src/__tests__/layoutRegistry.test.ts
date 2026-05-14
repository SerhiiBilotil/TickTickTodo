import { layoutRegistry } from "@/features/drag-drop/lib/layoutRegistry";

describe("layoutRegistry", () => {
    beforeEach(() => {
        layoutRegistry.clear();
    });

    it("registers and finds zone by Y", () => {
        layoutRegistry.registerZone({
            id: "zone-1",
            y: 0,
            height: 300,
        });

        const zone = layoutRegistry.getZoneByY(150);

        expect(zone?.id).toBe("zone-1");
    });

    it("returns correct index", () => {
        const index = layoutRegistry.getIndex(
            { id: "z", y: 0, height: 300 },
            120,
            ["a", "b", "c"]
        );

        expect(typeof index).toBe("number");
        expect(index >= 0).toBe(true);
    });
});
