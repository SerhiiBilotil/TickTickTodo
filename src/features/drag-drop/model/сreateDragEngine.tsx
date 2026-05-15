import { useDragStore } from "@/store/drag.store";

export function createDragEngine() {
    let startX = 0;
    let startY = 0;

    let dragging = false;
    let hasMoved = false;
    let activated = false;

    let timer: ReturnType<typeof setTimeout> | null = null;

    let activeId: string | null = null;
    let fromCategory: string | null = null;

    let onGestureStart = () => {};
    let onDragStart = (id: string, categoryId: string, e, startX: number, startY: number) => {};

    let onMove = (x: number, y: number) => {};
    let onEnd = (resetState: boolean) => {};

    function start(id, categoryId, e) {

        startX = e.absoluteX;
        startY = e.absoluteY;

        activeId = id;
        fromCategory = categoryId;

        dragging = false;
        hasMoved = false;
        activated = false;

        timer = setTimeout(() => {
            activated = true;
            onDragStart(
                activeId!,
                fromCategory!,
                e,
                startX,
                startY
            );
        }, 500);
    }

    function move(e) {
        const dx = e.absoluteX - startX;
        const dy = e.absoluteY - startY;

        if (
            activated &&
            !dragging &&
            Math.hypot(dx, dy) > 8
        ) {
            dragging = true;
            hasMoved = true;

            onDragStart(
                activeId!,
                fromCategory!,
                e,
                startX,
                startY
            );
        }

        if (!dragging) return;

        onMove(e.absoluteX, e.absoluteY);
    }

    function end() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (!dragging || !hasMoved) {
            onEnd(true);
            return;
        }

        onEnd(false);

        dragging = false;
        activeId = null;
        fromCategory = null;
        activated = false;
    }

    function cancel() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        hasMoved = false;
        dragging = false;
        activated = false;

        activeId = null;
        fromCategory = null;

        useDragStore.getState().reset();
    }

    return {
        start,
        move,
        end,
        cancel,
        setHandlers: (h) => {
            onGestureStart = h.onGestureStart || onGestureStart;
            onDragStart = h.onDragStart || onDragStart;
            onMove = h.onMove || onMove;
            onEnd = h.onEnd || onEnd;
        },
    };
}
