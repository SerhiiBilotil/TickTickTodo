import React, { useMemo, useRef, useEffect } from "react";
import { Pressable } from "react-native";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";

type Props = {
    sheetRef: any;
    categories: Array<{
        id: string;
        title: string;
    }>;
    onSelect: (id: string) => void;
};

export const CategorySelectModal = ({
                                        sheetRef,
                                        categories,
                                        onSelect,
                                    }: Props) => {
    const snapPoints = useMemo(() => ["50%"], []);


    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.5}
        />
    );

    return (
        <BottomSheetModal
            ref={sheetRef}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            enablePanDownToClose
            handleComponent={null}
        >
            <BottomSheetView style={{ padding: 16 }}>
                <Box gap="s">
                    {categories.map((cat) => (
                        <Pressable
                            key={cat.id}
                            onPress={() => {
                                onSelect(cat.id);
                                sheetRef.current?.dismiss();
                            }}
                        >
                            <Box
                                padding="m"
                                borderRadius="m"
                                backgroundColor="card"
                            >
                                <Text color="white">
                                    {cat.title}
                                </Text>
                            </Box>
                        </Pressable>
                    ))}
                </Box>
            </BottomSheetView>
        </BottomSheetModal>
    );
};
