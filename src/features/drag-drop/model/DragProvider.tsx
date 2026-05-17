import {createContext, useContext, useRef, useState} from "react";
import { useSharedValue } from "react-native-reanimated";

const DragContext = createContext(null);

export const DragProvider = ({ children }) => {
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    const scrollYRef = useRef(0);
    const overIndex = useSharedValue(null);
    const overCategory = useSharedValue(null);


    const [preview, setPreview] = useState({
        category: null,
        index: null,
    });

    const reset = () => {
        x.value = 0;
        y.value = 0;
        overIndex.value = null;
        overCategory.value = null;

        setPreview({
            category: null,
            index: null,
        });

    };

    return (
        <DragContext.Provider
            value={{
                x,
                y,
                overIndex,
                overCategory,
                preview,
                setPreview,
                scrollYRef,
                reset,
            }}
        >
            {children}
        </DragContext.Provider>
    );
};

export const useDrag = () => {
    const ctx = useContext(DragContext);
    if (!ctx) throw new Error("useDrag must be used within DragProvider");
    return ctx;
};
