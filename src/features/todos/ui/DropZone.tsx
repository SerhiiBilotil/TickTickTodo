import React, { useEffect } from "react";
import { View } from "react-native";
import { layoutRegistry } from "@/features/drag-drop/lib/layoutRegistry";

export const DropZone = ({ categoryId, children }) => {
    const ref = React.useRef(null);

    const onLayout = (e) => {
        layoutRegistry.registerZone({
            id: categoryId,
            y: e.nativeEvent.layout.y,
            height: e.nativeEvent.layout.height,
        });
    };

    return (
        <View onLayout={onLayout} ref={ref}>
            {children}
        </View>
    );
};
