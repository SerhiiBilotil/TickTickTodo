import { useTodoStore } from "@/store/todo.store";

describe("todo store", () => {
    beforeEach(() => {
        useTodoStore.setState({
            todos: [],
            categories: [
                { id: "today", title: "Today" },
                { id: "week", title: "This Week" },
                { id: "personal", title: "Personal" },
            ],
        });
    });

    it("adds todo item", () => {
        useTodoStore.getState().addTodoItem({
            title: "Test todo",
            description: "desc",
            categoryId: "today",
        });

        const todos = useTodoStore.getState().todos;

        expect(todos.length).toBe(1);
        expect(todos[0].title).toBe("Test todo");
    });

    it("reorders todos", () => {
        useTodoStore.setState({
            todos: [
                { id: "1", title: "A", description: "", categoryId: "today" },
                { id: "2", title: "B", description: "", categoryId: "today" },
            ],
        });

        useTodoStore.getState().reorderTodos("2", 0, "today");

        const todos = useTodoStore.getState().todos;

        expect(todos[0].id).toBe("2");
    });
});
