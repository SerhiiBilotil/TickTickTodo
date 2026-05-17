import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {TODO_ITEM_HEIGHT} from "@/features/todos/constants";



export const DropPlaceholder = ({ index, categoryId }) => {
    const style = useAnimatedStyle(() => {
        return {
            height: TODO_ITEM_HEIGHT ,
        };
    });



    return (
        <Animated.View
            style={[
                {
                    borderRadius: 12,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    marginBottom: 8,
                },
                style,
            ]}
        />
    );
};
