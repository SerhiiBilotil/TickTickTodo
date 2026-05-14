import React from "react";
import { Modal, Pressable, View } from "react-native";

import { CreateTodoForm } from "./CreateTodoForm";
import {Box} from "@/shared/ui/Box";

type Props = {
    visible: boolean;
    onClose: () => void;
    categoryOpen: boolean;
    onCloseCategory: (open: boolean) => void;
};

export const CreateTodoModal = ({ visible, onClose, categoryOpen,onCloseCategory }: Props) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <Pressable
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    justifyContent: "flex-end",
                }}
                onPress={onClose}
            >
                <Pressable onPress={() => {}}>
                    <Box
                        backgroundColor="card"
                        borderRadius="l"
                        padding="l"
                        gap="m"
                    >
                        <CreateTodoForm onClose={onClose} categoryOpen={categoryOpen} setCategoryOpen={onCloseCategory}  />
                    </Box>
                </Pressable>
            </Pressable>
        </Modal>
    );
};
