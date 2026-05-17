import {useTodoStore} from "@/store/todo.store";

export const todoStore = {

    get todos() {
        return useTodoStore.getState().todos;
    },

    get categories() {
        return useTodoStore.getState().categories;
    },
};
