import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useDrag } from "@/features/drag-drop/model/DragProvider";

const ITEM_HEIGHT = 50;

export const DropPlaceholder = ({ index, categoryId }) => {
    const { overIndex, overCategory } = useDrag();

    const style = useAnimatedStyle(() => {
        return {
            height: 55,
            overflow: "hidden",
        };
    });

    return (
        <Animated.View
            style={[
                {
                    borderRadius: 12,
                    backgroundColor: "rgba(255,255,255,0.06)",
                },
                style,
            ]}
        />
    );
};
