import React from "react";
import Animated, { FadeIn, FadeOut, useAnimatedStyle } from "react-native-reanimated";

const ITEM_HEIGHT = 55;

export const DropPlaceholder = ({
                                    index,
                                    categoryId,
                                    isEnd = false,
                                    overIndex,
                                    overCategory,
                                }) => {
    const style = useAnimatedStyle(() => {
        const isActive =
            overCategory.value === categoryId &&
            overIndex.value === index;

        return {
            height: ITEM_HEIGHT,
            opacity: isActive ? 1 : 0,
        };
    });

    return (
        <Animated.View
            entering={FadeIn.duration(120)}
            exiting={FadeOut.duration(120)}
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
