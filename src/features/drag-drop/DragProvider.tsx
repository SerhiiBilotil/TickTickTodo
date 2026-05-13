import {useSharedValue} from "react-native-reanimated";
import {createContext, useContext} from "react";

const DragContext = createContext(null);

export const DragProvider = ({ children }: { children: React.ReactNode }) => {
    const x = useSharedValue(-100);
    const y = useSharedValue(0);
    const activeIndex = useSharedValue<number | null>(null);
    const overIndex = useSharedValue<number | null>(null);
    const overCategory = useSharedValue<string | null>(null);
    const listOffset = useSharedValue(0);


    const resetPointer = () => {
        x.value = 0;
        y.value = 0;
        overIndex.value = null;
        overCategory.value = null;
    };
    return (
        <DragContext.Provider value={{ x, y, resetPointer, overIndex, overCategory, activeIndex,listOffset }}>
            {children}
        </DragContext.Provider>
    );
};

export const useDrag = () => {
    const context = useContext(DragContext);

    if (!context) {
        throw new Error("useDrag must be used within DragProvider");
    }

    return context;
};
