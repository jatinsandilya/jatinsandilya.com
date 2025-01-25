import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { execSync } from 'child_process';

// Get the last commit date using git
const lastUpdate = execSync('git log -1 --format=%cd').toString().trim();

export default defineConfig({
    server: {
        port: 3006,
    },
    resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                main: '/index.html',
            },
        },
    },
    assetsInclude: ['**/*.md'],
    define: {
        __LAST_UPDATE__: JSON.stringify(new Date(lastUpdate).toLocaleDateString())
    }
});
