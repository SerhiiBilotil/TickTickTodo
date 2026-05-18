import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "@/shared/theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";


export default function RootLayout() {
    return (
        <ThemeProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                <Stack screenOptions={{ headerShown: false }} />
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
