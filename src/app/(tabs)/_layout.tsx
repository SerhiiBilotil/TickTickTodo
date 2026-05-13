import React from "react";
import { Tabs } from "expo-router";

import { Box } from "@/shared/ui/Box";
import { Text } from "react-native";
import { theme } from "@/shared/theme/theme";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: theme.colors.border,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.secondaryText,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Tasks",
                    tabBarIcon: ({ color }) => (
                        <Text color={color}>●</Text>
                    ),
                }}
            />
        </Tabs>
    );
}
