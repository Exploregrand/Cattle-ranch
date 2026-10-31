import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // "server-only" throws outside Next's server; it's a no-op for unit tests.
      "server-only": path.resolve(__dirname, "tests/empty.ts"),
    },
  },
  test: { include: ["tests/**/*.test.ts"] },
});
