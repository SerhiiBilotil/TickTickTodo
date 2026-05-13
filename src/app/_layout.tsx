import React from "react";
import { Stack } from "expo-router";

import { ThemeProvider } from "@shopify/restyle";

import { theme } from "@/shared/theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {DragProvider} from "@/features/drag-drop/DragProvider";
import {StatusBar} from "react-native";


export default function RootLayout() {
    return (
        <ThemeProvider theme={theme}>
            <DragProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }} />

            </GestureHandlerRootView>
            </DragProvider>
        </ThemeProvider>
    );
}
