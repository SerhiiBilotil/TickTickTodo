import { useRef } from "react";
import { useTodoStore } from "@/store/store";

export const useTodoDrag = () => {
    const drag = useTodoStore((s) => s.drag);

    const startDrag = useTodoStore((s) => s.startDrag);
    const resetDrag = useTodoStore((s) => s.resetDrag);
    const reorderTodo = useTodoStore((s) => s.reorderTodos);

    const setHoverPreview = useTodoStore((s) => s.setHoverPreview);

    const currentCategoryRef = useRef<string | null>(null);

    const startDragHandler = (id: string) => {
        currentCategoryRef.current = null;
        startDrag(id);
    };

    const endDrag = ({ categoryId, index }) => {
        const activeTodoId = drag.activeTodoId;

        console.log("enddrag", categoryId, index);

        if (activeTodoId && categoryId && index != null) {
            reorderTodo(activeTodoId, index, categoryId);
        }
        setHoverPreview(null, null);
        resetDrag();
    };

    return {
        drag,
        startDrag: startDragHandler,
        endDrag,
        setHoverPreview,
        currentCategory: currentCategoryRef,
    };
};
