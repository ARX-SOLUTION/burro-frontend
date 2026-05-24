import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: { port: 5175 },
    build: {
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom", "react-router-dom"],
                    query: ["@tanstack/react-query"],
                    ui: ["sonner"],
                    icons: ["@untitledui/icons", "@untitledui/file-icons"],
                    aria: [
                        "react-aria",
                        "react-aria-components",
                        "react-stately",
                        "@react-aria/utils",
                        "@react-stately/utils",
                        "@internationalized/date",
                    ],
                    forms: ["react-hook-form", "@hookform/resolvers", "zod"],
                    motion: ["motion"],
                    utils: ["axios", "date-fns", "tailwind-merge"],
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@burro/shared": path.resolve(__dirname, "../../packages/shared/src"),
        },
    },
});
