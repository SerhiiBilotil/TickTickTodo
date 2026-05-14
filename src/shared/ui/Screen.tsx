import React from "react";

import { StatusBar } from "expo-status-bar";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import { Box } from "./Box";

type Props = {
    children: React.ReactNode;
};

export const Screen = ({children}: Props) => {
    return (
        <Box
            flex={1}
            backgroundColor="background"
        >

                <StatusBar style={'light'} />
            <SafeAreaView
                style={{ flex: 1 }}
                edges={["top"]}
            >
                <Box
                    flex={1}
                    backgroundColor="background"
                >
                    <Box
                        flex={1}
                        paddingTop="m"
                    >
                        {children}
                    </Box>
                </Box>
            </SafeAreaView>
        </Box>
    );
};
