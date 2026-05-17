import { makeMutable } from "react-native-reanimated";

export const dragX = makeMutable(0);
export const dragY = makeMutable(0);


export const resetDragShared = () => {
    dragX.value = 0;
    dragY.value = 0;
};
