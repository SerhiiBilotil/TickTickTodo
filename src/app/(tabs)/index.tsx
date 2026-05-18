import React, {useEffect, useRef, useState} from "react";

import { useUIStore } from "@/store/ui.store";

import { Screen } from "@/shared/ui/Screen";
import { FloatingButton } from "@/shared/ui/FloatingButton";

import { TodoBoard } from "@/features/todos/ui/TodoBoard";
import { DragOverlay } from "@/features/drag-drop/ui/DragOverlay";
import { CreateTodoModal } from "@/features/add-todo-item/ui/CreateTodoModal";
import {Keyboard} from "react-native";

export default function Dashboard() {
    const [createOpen, setCreateOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);;

    const sheetRef = useRef<any>(null);
    const categorySheetRef = useRef<any>(null);
    const inputRef = useRef<any>(null);

    const openCreateModal = () => {
        sheetRef.current?.present();
        console.log('redf', sheetRef.current);
        setTimeout(() => {
            inputRef.current?.focus?.();
        }, 100);
    };

    const onHideTodoModal = () => {
        Keyboard.dismiss();
        sheetRef.current?.dismiss();
    }

    return (
        <Screen>

            <TodoBoard />

            <FloatingButton onPress={() => openCreateModal(true)} />

            <CreateTodoModal
                onHideTodoModal={onHideTodoModal}
                onCloseCategory={() => setCategoryOpen(false)}
                inputRef={inputRef}
                sheetRef={sheetRef}
                categorySheetRef={categorySheetRef}
            />
        </Screen>
    );
}
