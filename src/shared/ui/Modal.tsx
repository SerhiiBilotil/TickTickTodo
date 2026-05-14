import React from "react";

import { Modal } from "react-native";

import { Box } from "./Box";

type Props = {
    visible: boolean;
    children: React.ReactNode;
};

export const AppModal = ({
                             visible,
                             children,
                         }: Props) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <Box
                flex={1}
                justifyContent="center"
                padding="l"
                backgroundColor="modalBackdrop"
            >
                {children}
            </Box>
        </Modal>
    );
};
