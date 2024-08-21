"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("vitest/config");
const vite_tsconfig_paths_1 = __importDefault(require("vite-tsconfig-paths"));
const node_path_1 = __importDefault(require("node:path"));
exports.default = (0, config_1.defineConfig)({
    resolve: {
        alias: {
            '@': node_path_1.default.resolve(__dirname, './src'),
        },
    },
    plugins: [(0, vite_tsconfig_paths_1.default)()],
    test: {
        environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
    },
});
