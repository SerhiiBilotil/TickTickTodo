import {Pressable} from "react-native";
import { Text } from "@/shared/ui/Text";

export const FloatingButton = ({ onPress }) => {
    return (
        <Pressable onPress={onPress}>
            <Text>+</Text>
        </Pressable>
    );
};
