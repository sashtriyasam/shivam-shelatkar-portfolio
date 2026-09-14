import next from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";

const config = [
  ...next,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off"
    }
  },
  { ignores: [".next", "node_modules", "out", "build"] }
];

export default config;
