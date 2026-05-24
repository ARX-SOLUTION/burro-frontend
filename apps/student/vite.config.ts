import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: { port: 5173 },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@burro/shared": path.resolve(__dirname, "../../packages/shared/src"),
        },
    },
});