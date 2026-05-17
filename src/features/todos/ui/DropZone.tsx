import React, { useEffect } from "react";
import { View } from "react-native";
import { layoutRegistry } from "@/features/drag-drop/lib/layoutRegistry";
import {useDragStore} from "@/store/drag.store";

export const DropZone = ({ categoryId, children }) => {
    const ref = React.useRef(null);
    const setCategoryZones =
        useDragStore((s) => s.setCategoryZones);

    const onLayout = (e) => {
        setCategoryZones(categoryId, {
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
