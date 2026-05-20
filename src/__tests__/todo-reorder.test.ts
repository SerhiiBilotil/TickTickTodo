import {moveTodo} from "@/features/todos/lib/todo.utils";


describe("moveTodo", () => {
    const todos = [
        { id: "1", categoryId: "todo" },
        { id: "2", categoryId: "todo" },
        { id: "3", categoryId: "done" },
    ];

    it("moves item inside same category", () => {
        const result = moveTodo(todos, "1", "todo", 1);
        expect(
            result.filter(t => t.categoryId === "todo").map(t => t.id),
        ).toEqual(["2", "1"]);
    });

    it("moves item into another category", () => {
        const result = moveTodo(todos, "1", "done", 1);
        expect(
            result.filter(t => t.categoryId === "done").map(t => t.id),
        ).toEqual(["3", "1"]);
    });

    it("keeps immutable state", () => {
        const result = moveTodo(todos, "1", "done", 0);
        expect(result).not.toBe(todos);
    });

    it("returns original array if item not found", () => {
        expect(moveTodo(todos, "999", "done", 0))
            .toBe(todos);
    });
});
