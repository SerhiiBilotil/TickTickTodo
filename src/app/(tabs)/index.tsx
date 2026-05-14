import React, {useState} from "react";

import { useUIStore } from "@/store/ui.store";

import { Screen } from "@/shared/ui/Screen";
import { FloatingButton } from "@/shared/ui/FloatingButton";

import { TodoBoard } from "@/features/todos/ui/TodoBoard";
import { DragOverlay } from "@/features/drag-drop/ui/DragOverlay";
import { CreateTodoModal } from "@/features/add-todo-item/ui/CreateTodoModal";

export default function Dashboard() {
    const [createOpen, setCreateOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);;

    return (
        <Screen>
            <TodoBoard />
            <DragOverlay />

            <FloatingButton onPress={() => setCreateOpen(true)} />

            <CreateTodoModal
                visible={createOpen}
                onClose={setCreateOpen}
                categoryOpen={categoryOpen}
                onCloseCategory={() => setCategoryOpen(true)}
            />
        </Screen>
    );
}
