import React from "react";
import Modal from "react-native-modal";
import { Tag } from "lucide-react-native";

import { CreateTodoForm } from "./CreateTodoForm";
import { CategorySelectModal } from "./CategorySelectModal";

import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { useTodoStore } from "@/store/todo.store";
import {useCreateTodo} from "@/features/add-todo-item/model/useCreateTodo";

type Props = {
    visible: boolean;
    onClose: () => void;
    onCloseCategory: () => void;
    categoryName?: string;
    inputRef?: string;
    setCategoryId?: (id: string) => void;
};

export const CreateTodoModal = ({
                                    visible,
                                    onClose,
    inputRef,
                                    onCloseCategory
                                }: Props) => {
    const [open, setOpen] = React.useState(false);
    const [anchor, setAnchor] = React.useState({
        x: 0,
        y: 0,
    });
    const {
        title,
        setTitle,
        description,
        setDescription,
        categoryId,
        setCategoryId,
        submit,
    } = useCreateTodo(onClose);

    const categories = useTodoStore((state) => state.categories);

    const buttonRef = React.useRef<any>(null);



    const handleOpenCategories = () => {
        buttonRef.current?.measure(
            (fx, fy, width, height, px, py) => {
                const DROPDOWN_HEIGHT = 160;
                const MARGIN = 8;

                setAnchor({
                    x: px,
                    y: py - DROPDOWN_HEIGHT - MARGIN,
                });

                setOpen(true);
            }
        );
    };

    const handleSelectCategory = (id: string) => {
        setOpen(false);
        setCategoryId(id);
    };

    return (
        <Modal
            isVisible={visible}
            style={{ justifyContent: "flex-end", margin: 0 }}
            onBackdropPress={onClose}
            backdropOpacity={0.5}
            useNativeDriver
            avoidKeyboard
        >
            <Box
                backgroundColor="card"
                borderTopLeftRadius="xl"
                borderTopRightRadius="xl"
                padding="m"
                gap="l"
            >

                <Box
                    ref={buttonRef}
                >
                    <Box
                        onTouchEnd={handleOpenCategories}
                        backgroundColor="primary"
                        paddingHorizontal="m"
                        paddingVertical="s"
                        borderRadius="xl"
                        flexDirection="row"
                        alignItems="center"
                        gap="s"
                        alignSelf="flex-start"
                    >
                        <Tag size={16} color="white" />
                        <Text color="white" fontWeight="600">
                            {categories.find((c) => c.id === categoryId)?.title}
                        </Text>
                    </Box>
                </Box>


                <CreateTodoForm
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    submit={submit}
                    inputRef={inputRef}
                />
            </Box>


            <CategorySelectModal
                open={open}
                anchor={anchor}
                categories={categories}
                onClose={() => setOpen(false)}
                onSelect={handleSelectCategory}
            />
        </Modal>
    );
};
