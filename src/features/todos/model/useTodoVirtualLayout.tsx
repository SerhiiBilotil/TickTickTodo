import {useMemo} from "react";
import {useDrag} from "@/features/drag-drop/model/DragProvider";

export function useTodoVirtualLayout({ todos, preview, categoryId }) {
    return useMemo(() => {
        return {
            todos,
            placeholderIndex:
                preview.category === categoryId
                    ? preview.index
                    : -1,
        };
    }, [todos, preview.index, preview.category, categoryId]);
}
