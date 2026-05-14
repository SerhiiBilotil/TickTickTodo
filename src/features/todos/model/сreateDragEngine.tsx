export function createDragEngine() {
    let startX = 0;
    let startY = 0;
    let dragging = false;

    let activeId: string | null = null;
    let fromCategory: string | null = null;

    let onGestureStart = () => {};
    let onDragStart = (id: string, categoryId: string) => {};
    let onMove = (x: number, y: number) => {};
    let onEnd = () => {};

    function start(id, categoryId, e) {
        startX = e.absoluteX;
        startY = e.absoluteY;

        dragging = false;

        activeId = id;
        fromCategory = categoryId;
    }

    function move(e) {
        const dx = e.absoluteX - startX;
        const dy = e.absoluteY - startY;

        if (!dragging && Math.hypot(dx, dy) > 8) {
            dragging = true;

            onDragStart(activeId, fromCategory);
        }

        if (!dragging) return;

        onMove(e.absoluteX, e.absoluteY);
    }

    function end() {
        if (!dragging) {
            cancel();
            return;
        }

        onEnd();

        dragging = false;
        activeId = null;
        fromCategory = null;
    }

    function cancel() {
        dragging = false;
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
