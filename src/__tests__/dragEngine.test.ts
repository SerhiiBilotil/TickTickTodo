import { createDragEngine } from "@/features/drag-drop/model/сreateDragEngine";

describe("drag engine", () => {
    it("starts dragging after threshold", () => {
        const engine = createDragEngine();

        const onDragStart = jest.fn();

        engine.setHandlers({
            onDragStart,
        });
        jest.useFakeTimers();
        engine.start("1", "today", {
            absoluteX: 0,
            absoluteY: 0,
        });
        jest.advanceTimersByTime(500);
        engine.move({
            absoluteX: 20,
            absoluteY: 20,
        });

        expect(onDragStart).toHaveBeenCalled();
    });

    it("does not trigger drag before threshold", () => {
        const engine = createDragEngine();

        const onDragStart = jest.fn();

        engine.setHandlers({
            onDragStart,
        });

        engine.start("1", "today", {
            absoluteX: 0,
            absoluteY: 0,
        });

        engine.move({
            absoluteX: 2,
            absoluteY: 2,
        });

        expect(onDragStart).not.toHaveBeenCalled();
    });
});
