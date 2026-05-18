import React, {useMemo, useState, useRef, useEffect} from "react";
import {
    BottomSheetBackdrop,
    BottomSheetModal, BottomSheetScrollView,
    BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Tag } from "lucide-react-native";

import { CreateTodoForm } from "./CreateTodoForm";
import { CategorySelectModal } from "./CategorySelectModal";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { Box } from "@/shared/ui/Box";
import { Text } from "@/shared/ui/Text";
import { useTodoStore } from "@/store/todo.store";
import { useCreateTodo } from "@/features/add-todo-item/model/useCreateTodo";
import {theme} from "@/shared/theme/theme";
import {Keyboard, Pressable} from "react-native";

type Props = {
    sheetRef: any;
    inputRef?: any;
    categorySheetRef: any;
    onHideTodoModal: () => void;
};

export const CreateTodoModal = ({ sheetRef, inputRef,categorySheetRef, onHideTodoModal}: Props) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState({ x: 0, y: 0 });

    const categories = useTodoStore((s) => s.categories);

    const {
        title,
        setTitle,
        description,
        setDescription,
        categoryId,
        setCategoryId,
        submit,
    } = useCreateTodo(() => {
        sheetRef.current?.dismiss();
    });

    const buttonRef = useRef<any>(null);

    const handleOpenCategories = () => {
            // categorySheetRef.current?.present();
    };
    useEffect(() => {
        const show = Keyboard.addListener("keyboardDidShow", (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const hide = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardHeight(0);
        });

        return () => {
            show.remove();
            hide.remove();
        };
    }, []);


    const handleSelectCategory = (id: string) => {
        setOpen(false);
        setCategoryId(id);
    };


    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.6}
            pressBehavior="null"
            onPress={onHideTodoModal}
        />
    );

    return (
        <>
            <BottomSheetModal
                ref={sheetRef}
                handleComponent={null}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                backdropComponent={renderBackdrop}
                backgroundStyle={{backgroundColor: theme.colors.card}}
            >
                <BottomSheetView style={{ flex: 1, padding: 16 }}>
                    <Box
                        backgroundColor="card"
                        borderTopLeftRadius="xl"
                        borderTopRightRadius="xl"
                        padding="m"
                        gap="l"
                    >
                        <Box ref={buttonRef}>
                            <Pressable onPress={handleOpenCategories}>
                                {({ pressed }) => (
                                    <Box
                                        backgroundColor="primary"
                                        paddingHorizontal="m"
                                        paddingVertical="s"
                                        borderRadius="xl"
                                        flexDirection="row"
                                        alignItems="center"
                                        gap="s"
                                        alignSelf="flex-start"
                                        style={{
                                            opacity: pressed ? 0.6 : 1,
                                        }}
                                    >
                                        <Tag size={16} color="white" />

                                        <Text color="white">
                                            {
                                                categories.find(
                                                    (c) => c.id === categoryId
                                                )?.title
                                            }
                                        </Text>
                                    </Box>
                                )}
                            </Pressable>
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

                </BottomSheetView>

                <CategorySelectModal
                    sheetRef={categorySheetRef}
                    categories={categories}
                    onSelect={setCategoryId}
                />
            </BottomSheetModal>


        </>
    );
};
