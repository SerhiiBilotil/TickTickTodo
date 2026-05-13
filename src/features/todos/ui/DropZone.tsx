import React, {
    useEffect,
    useRef,
} from "react";
import Animated from "react-native-reanimated";
import { View } from "react-native";
import {registerZone} from "@/features/drag-drop/useDropZones";
import {useAnimatedStyle, withSpring} from "react-native-reanimated";
import {useDrag} from "@/features/drag-drop/DragProvider";


export const DropZone = ({categoryId, children,}) => {
    const { listOffset} = useDrag();
    const ref = useRef<View>(null);

    useEffect(() => {
        requestAnimationFrame(() => {
            ref.current?.measure((x, y, width, height, pageX, pageY) => {
                registerZone(categoryId, pageY, height);
            });
        });
    }, [categoryId, children]);

    ref.current?.measure((x, y, w, h, px, py) => {
        listOffset.value = py;
    });

    return (
        <View ref={ref}>
            {children}
        </View>
    );
};
