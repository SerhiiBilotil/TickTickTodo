import React from "react";
import { View, StyleSheet } from "react-native";
import { useTodoStore } from "@/store/store";
import { TodoBoard } from "@/features/todos/ui/TodoBoard";
import { FloatingButton } from "@/shared/ui/FloatingButton";
import {DragOverlay} from "@/features/drag-drop/ui/DragOverlay";

export default function HomeScreen() {
  const todos = useTodoStore((state) => state.todos);

  return (
      <View style={styles.container}>
        <TodoBoard todos={todos} />
         <DragOverlay/>

        <FloatingButton />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f12",
  },
});
