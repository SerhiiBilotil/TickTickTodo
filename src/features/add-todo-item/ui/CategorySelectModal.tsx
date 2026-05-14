import React from "react";
import { Modal, Pressable } from "react-native";
import { Box } from "@/shared/ui/Box";
import { Button } from "@/shared/ui/Button";
import {Category} from "@/entities/todo/model/types";



type Props = {
    open: boolean;
    onClose: () => void;
    value: string;
    onChange: (id: string) => void;
    categories: Category[];
};

export const CategorySelectModal = ({
                                        open,
                                        onClose,
                                        value,
                                        onChange,
                                        categories,
                                    }: Props) => {
    return (
        <Modal
            visible={open}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >

            <Pressable
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0,0,0,0.4)",
                }}
                onPress={onClose}
            >
                <Box
                    backgroundColor="card"
                    padding="m"
                    borderRadius="l"
                    style={{
                        position: "absolute",
                        top: 120,
                        left: 20,
                        right: 20,
                        elevation: 10,
                    }}
                >
                    <Box gap="s">
                        {categories.map((cat) => (
                            <Button
                                key={cat.id}
                                title={cat.title}
                                onPress={() => {
                                    onChange(cat.id);
                                    onClose();
                                }}
                                variant={
                                    value === cat.id
                                        ? "primary"
                                        : "secondary"
                                }
                            />
                        ))}
                    </Box>
                </Box>
            </Pressable>
        </Modal>
    );
};
