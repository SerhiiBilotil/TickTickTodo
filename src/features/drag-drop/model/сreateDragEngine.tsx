import { useDragStore } from "@/store/drag.store";

export function createDragEngine() {
    let startX = 0;
    let startY = 0;

    let state = "idle";
    let activated = false;

    let timer: ReturnType<typeof setTimeout> | null = null;

    let activeId: string | null = null;
    let fromCategory: string | null = null;

    let onGestureStart = (id: string, categoryId: string, e, startX: number, startY: number) => {};
    let onDragStart = (id: string, categoryId: string, e, startX: number, startY: number) => {};
    let onMove = (id ,dx: number, dy: number) => {};
    let onEnd = (resetState: boolean) => {};

    function start(id, categoryId, e) {

        activeId = id;
        fromCategory = categoryId;

        state = "pressing";

        onGestureStart(
            activeId!,
            fromCategory!,
            e,
            startX,
            startY
        );

        timer = setTimeout(() => {
            activated = true;
        }, 250);
    }

    function move(id,categoryId, e) {
        const dx = e.translationX ;
        const dy = e.translationY ;
       console.log('dy', dy)

        if (
            activated &&
            state !== "dragging"
        ) {
            state = "dragging";

            onDragStart(
                activeId!,
                 fromCategory!,
                 0,
                 0,
                 e.absoluteX,
                 e.absoluteY,
            );
        }

        if (state !== "dragging") return;

        onMove(id,categoryId, dx, dy, e);
    }

    function end() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        onEnd(state !== "dragging");

        state = "idle";

        activeId = null;
        fromCategory = null;
    }

    function cancel() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

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
