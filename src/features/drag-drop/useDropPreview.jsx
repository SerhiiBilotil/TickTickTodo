import { useAnimatedReaction, runOnJS } from "react-native-reanimated";
import { useState } from "react";

export const useDropPreview = (overCategory, overIndex) => {
    const [preview, setPreview] = useState({
        category: null,
        index: null,
    });

    useAnimatedReaction(
        () => {
            return {
                category: overCategory.value,
                index: overIndex.value,
            };
        },
        (current, prev) => {
            if (
                current.category === prev?.category &&
                current.index === prev?.index
            ) {
                return;
            }

            runOnJS(setPreview)(current);
        }
    );

    return preview;
};
