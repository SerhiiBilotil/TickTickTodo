import { makeMutable } from "react-native-reanimated";

export const initialDragX = makeMutable(0);
export const initialDragY = makeMutable(0);

export const dragX = makeMutable(0);
export const dragY = makeMutable(0);


export const resetDragShared = () => {
    initialDragX.value = 0;
    initialDragY.value = 0;

    dragX.value = 0;
    dragY.value = 0;
};
