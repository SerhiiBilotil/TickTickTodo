import { renderHook, act } from "@testing-library/react-native";
import { useCreateTodo } from "@/features/add-todo-item/model/useCreateTodo";

describe("useCreateTodo", () => {
    it("creates todo and resets state", () => {
        const onClose = jest.fn();

        const { result } = renderHook(() =>
            useCreateTodo(onClose)
        );

        act(() => {
            result.current.setTitle("Hello");
            result.current.setDescription("World");
            result.current.setCategoryId("today");
        });

        act(() => {
            result.current.submit();
        });

        expect(result.current.title).toBe("");
        expect(onClose).toHaveBeenCalled();
    });

    it("does not submit empty title", () => {
        const onClose = jest.fn();

        const { result } = renderHook(() =>
            useCreateTodo(onClose)
        );

        act(() => {
            result.current.submit();
        });

        expect(onClose).not.toHaveBeenCalled();
    });
});
