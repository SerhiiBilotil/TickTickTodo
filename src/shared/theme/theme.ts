import { createTheme } from "@shopify/restyle";

export const theme = createTheme({
    colors: {
        background: "#0F0F12",
        card: "#1C1C22",
        primary: "#7C5CFF",
        text: "#FFFFFF",
        secondaryText: "#A0A0B2",
        border: "#2A2A33",
        white: "#FFFFFF",
        modalBackdrop: "rgba(0,0,0,0.7)",
        danger: "#FF5A5A",
        success: "#43D19E",
    },

    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
        xxl: 40,
    },
    borderWidth: {
        none: 0,
        thin: 1,
        medium: 2,
        thick: 4,
    },
    borderRadii: {
        s: 8,
        m: 12,
        l: 20,
        xl: 30,
        full: 999,
    },

    textVariants: {
        defaults: {
            fontSize: 14,
            color: "text",
        },

        title: {
            fontSize: 20,
            color: "text",
            fontWeight: "600",
        },

        subtitle: {
            fontSize: 16,
            color: "secondaryText",
        },

        categoryTitle: {
            fontSize: 16,
            color: "secondaryText",
            fontWeight: "600",
        },

        button: {
            fontSize: 16,
            color: "white",
            fontWeight: "600",
        },

        input: {
            fontSize: 16,
            color: "text",
        },

        modalTitle: {
            fontSize: 22,
            color: "text",
            fontWeight: "700",
        },

        error: {
            fontSize: 13,
            color: "danger",
        },
    },
});

export type Theme = typeof theme;
