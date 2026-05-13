import { createTheme } from "@shopify/restyle";

export const theme = createTheme({
    colors: {
        background: "#0F0F12",
        card: "#1C1C22",
        primary: "#7C5CFF",
        text: "#FFFFFF",
        secondaryText: "#A0A0B2",
        border: "#2A2A33",
    },

    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 24,
        xl: 32,
    },

    borderRadii: {
        s: 8,
        m: 12,
        l: 20,
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
        },

    },
});

export type Theme = typeof theme;
