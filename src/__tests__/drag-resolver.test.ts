import {
    resolveIndexByY,
    resolveZoneByY,
} from "@/features/drag-drop/lib/drag-resolver";

describe("resolveZoneByY", () => {
    const zones = new Map([
        [
            "todo",
            {
                id: "todo",
                y: 0,
                height: 200,
            },
        ],
        [
            "done",
            {
                id: "done",
                y: 200,
                height: 200,
            },
        ],
    ]);

    it("returns correct zone", () => {
        expect(resolveZoneByY(100, zones)?.id).toBe("todo");

        expect(resolveZoneByY(250, zones)?.id).toBe("done");
    });

    it("returns null when outside zones", () => {
        expect(resolveZoneByY(1000, zones)).toBeNull();
    });

    it("handles edge boundaries", () => {
        expect(resolveZoneByY(200, zones)?.id).toBe("todo");
    });
});

describe("resolveIndexByY", () => {
    const layouts = {
        "1": {
            y: 0,
            height: 100,
        },
        "2": {
            y: 100,
            height: 100,
        },
        "3": {
            y: 200,
            height: 100,
        },
    };

    const zone = {
        id: "todo",
        y: 0,
        height: 500,
    };

    it("inserts at start", () => {
        const index = resolveIndexByY(
            10,
            ["1", "2", "3"],
            "3",
            layouts,
            zone,
        );

        expect(index).toBe(0);
    });

    it("inserts in middle", () => {
        const index = resolveIndexByY(
            160,
            ["1", "2", "3"],
            "3",
            layouts,
            zone,
        );

        expect(index).toBe(2);
    });

    it("inserts at end", () => {
        const index = resolveIndexByY(
            999,
            ["1", "2", "3"],
            "3",
            layouts,
            zone,
        );

        expect(index).toBe(3);
    });

    it("handles missing layouts", () => {
        const index = resolveIndexByY(
            50,
            ["missing"],
            "1",
            {},
            zone,
        );

        expect(index).toBe(1);
    });
});
