export type Category = {
    id: string;
    title: string;
};

export type Todo = {
    id: string;
    title: string;
    description?: string;
    categoryId: string;
};
