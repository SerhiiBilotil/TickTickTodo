import {
    finishDrag,
    getCategoryTodoIds,
    getZoneData,
} from "@/features/drag-drop/lib/drag.utils";

jest.useFakeTimers();

describe("getZoneData", () => {
    const layouts = {
        "1": {
            x: 0,
            y: 0,
            width: 100,
            height: 40,
        },
    };

    const zones = {
        todo: {
            id: "todo",
            y: 0,
            height: 400,
        },
    };

    it("returns layout and zone", () => {
        expect(getZoneData("1", "todo", layouts, zones))
            .toEqual({
                layout: layouts["1"],
                zone: zones.todo,
            });
    });

    it("returns null for missing layout", () => {
        expect(getZoneData("999", "todo", layouts, zones))
            .toBeNull();
    });

    it("returns null for missing zone", () => {
        expect(getZoneData("1", "missing", layouts, zones))
            .toBeNull();
    });
});

describe("getCategoryTodoIds", () => {
    const todos = [
        { id: "1", categoryId: "todo" },
        { id: "2", categoryId: "todo" },
        { id: "3", categoryId: "done" },
    ];

    it("returns category item ids", () => {
        expect(getCategoryTodoIds("todo", todos))
            .toEqual(["1", "2"]);
    });

    it("returns empty array for empty category", () => {
        expect(getCategoryTodoIds("missing", todos))
            .toEqual([]);
    });
});

describe("finishDrag", () => {
    it("resets drag state", () => {
        const reset = jest.fn();
        const setReordering = jest.fn();

        finishDrag(reset, setReordering);

        expect(reset).toHaveBeenCalled();

        jest.advanceTimersByTime(200);

        expect(setReordering).toHaveBeenCalledWith(false);
    });
});
