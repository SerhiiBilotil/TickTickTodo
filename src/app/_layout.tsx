import React from "react";
import { Stack } from "expo-router";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "@/shared/theme/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function RootLayout() {
    return (
        <ThemeProvider theme={theme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }} />

            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
