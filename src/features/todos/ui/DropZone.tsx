import React, { ReactNode, useRef } from "react";
import { View, LayoutChangeEvent } from "react-native";
import { useDragStore } from "@/store/drag.store";

type Props = {
    categoryId: string;
    children: ReactNode;
};

export const DropZone = ({ categoryId, children }: Props) => {
    const ref = useRef<View>(null);

    const setCategoryZones =
        useDragStore(s => s.setCategoryZones);

    const onLayout = (e: LayoutChangeEvent) => {
        const { y, height } = e.nativeEvent.layout;

        setCategoryZones(categoryId, {
            id: categoryId,
            y,
            height,
        });
    };

    return (
        <View ref={ref} onLayout={onLayout}>
            {children}
        </View>
    );
};
