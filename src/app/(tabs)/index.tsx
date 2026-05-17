import React, {useEffect, useState} from "react";

import { useUIStore } from "@/store/ui.store";

import { Screen } from "@/shared/ui/Screen";
import { FloatingButton } from "@/shared/ui/FloatingButton";

import { TodoBoard } from "@/features/todos/ui/TodoBoard";
import { DragOverlay } from "@/features/drag-drop/ui/DragOverlay";
import { CreateTodoModal } from "@/features/add-todo-item/ui/CreateTodoModal";

export default function Dashboard() {
    const [createOpen, setCreateOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);;

    const inputRef = React.useRef<any>(null);

    const openCreateModal = async () => {
        setCreateOpen(true);

    }


    useEffect(() => {
        if (createOpen) {
            setTimeout(() => {
                inputRef.current?.focus?.();
            }, 300);
        }
    }, [createOpen]);


    return (
        <Screen>

            <TodoBoard />

            <FloatingButton onPress={() => openCreateModal(true)} />

            <CreateTodoModal
                visible={createOpen}
                onClose={() => setCreateOpen(false)}
                categoryOpen={categoryOpen}
                onCloseCategory={() => setCategoryOpen(false)}
                inputRef={inputRef}
            />
        </Screen>
    );
}
