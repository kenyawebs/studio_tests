marp: true
theme: gaia
class: lead
paginate: true
---

# Node/React/TypeScript/Playwright Troubleshooting & Action Plan

---

## 1. NPM Dependency, Audit, & Install Issues

### Symptoms
- Warnings about deprecated packages (`inflight`, `rimraf`, `glob`, etc.)
- Low severity vulnerabilities (`tmp` via `patch-package`)
- `npm install` 404 errors for missing packages

### Fixes
- **Deprecation warnings**: Accept for dev dependencies; for prod, update when possible.
- **Vulnerabilities**: If dev-only, ignore or monitor. Remove unused packages.
- **404 errors**: Double-check package name, source, and version.
  - For private/git packages:
    `npm install git+https://github.com/owner/repo.git`
- **Audit**:
  - Regularly run `npm audit` to identify vulnerabilities. Use `npm audit fix` to apply patches.
  - Only critical/high vulnerabilities require urgent action.
- **Reproducible Installs**:
  - For CI/CD or clean installs, prefer `npm ci` over `npm install`. It uses the `package-lock.json` for deterministic, faster, and safer builds.

### Command Reference
```bash
npm uninstall patch-package      # Remove if not used
npm outdated                    # Check for outdated packages
npm update                      # Update packages to latest allowed version
npm fund                        # Show packages needing funding
npm audit                       # Review security status
npm audit fix                   # Apply fixes for vulnerabilities
npm ci                          # Clean install from package-lock.json
npm install <package>           # Try again after fixing name/source
```

---

## 2. ESLint & Prettier Configuration

### Problem
- The project currently uses the legacy `.eslintrc.json` format.
- ESLint v9+ has deprecated `.eslintignore` in favor of a unified configuration file.
- The Prettier plugin for ESLint is not installed, leading to integration issues.

### Fixes
- **Migrate to Flat Config**: The recommended approach is to migrate from `.eslintrc.json` to the modern `eslint.config.js` (flat config). This provides a more explicit, composable, and future-proof configuration.
  - Delete `.eslintrc.json` and remove `.eslintignore`.
  - Create an `eslint.config.js` file (see template on next slide).
- **Install Prettier Dependencies**: This project is missing the necessary ESLint/Prettier integration packages.
  ```bash
  # Install Prettier plugins for ESLint integration
  npm install -D eslint-plugin-prettier eslint-config-prettier
  ```
- The `--legacy-peer-deps` flag might be needed if you encounter peer dependency conflicts during installation.

---

## ESLint Migration: Flat Config Template

```js name=eslint.config.js
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["scripts/**"], // add other ignore patterns here
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: pluginPrettier,
    },
    rules: {
      "no-unused-vars": "warn",
      "prettier/prettier": "error"
    },
  },
  configPrettier
];
```

---

## 3. NPM Scripts & Standardization

### Symptoms
- `'<script-name>' is not recognized…` or missing script errors.
- Inconsistent or missing scripts for common tasks like linting, formatting, and testing.

### Fixes
- **Verify Existing Scripts**: Always check `package.json` for the exact script names. This project includes `lint` and `typecheck`.
  - `npm run lint`
  - `npm run typecheck`
- **List Available Scripts**: To see all available scripts, run `npm run`.
- **Recommended Additions**: For a better developer experience, add these standard scripts to `package.json`:
  ```json
  "scripts": {
    // ... existing scripts
    "lint:fix": "next lint --fix",
    "format:check": "prettier --check .",
    "format:write": "prettier --write .",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
  ```

---

## 4. TypeScript Errors & Per-File Fixes

### General Approach
- Read error line, file, and type
- Prefer correcting types, proper imports, and explicit annotations over type casts
- For temporary bypass:
  `npx tsc --noEmit --skipLibCheck`

---

## Example File Fixes

### `src/ai/genkit.ts`
- **Error:** Unknown property `'vertex'` in `PluginOptions`
- **Quick Fix:**
  ```ts
  const options = {...} as unknown as PluginOptions;
  ```
- **Proper Fix:** Module augmentation in `types/genkit.d.ts`
  ```ts
  declare module "@genkit-ai/core" {
    interface PluginOptions {
      vertex?: unknown;
    }
  }
  ```

### `src/components/app/social-feed-content.tsx`
- **Error:** UMD `React` global used in module
- **Fix:**
  ```ts
  import * as React from "react";
  ```

### `src/components/ui/calendar.tsx`
- **Error:** Wrong component keys, implicit `any`
- **Fix:** Use correct DayPicker API (`PrevButton`, `NextButton`), type params
  ```tsx
  // Note: While `[k: string]: any` is a quick fix for passing props,
  // always prefer to find the correct prop types from the library's
  // documentation (e.g., DayPicker's ComponentProps) for better type safety.
  components={{
    PrevButton: ({ className, ...props }: { className?: string; [k: string]: any }) => (
      <button {...props}><ChevronLeft className={className} /></button>
    ),
    NextButton: ({ className, ...props }: { className?: string; [k: string]: any }) => (
      <button {...props}><ChevronRight className={className} /></button>
    ),
  }}
  ```

### `src/components/ui/chart.tsx`
- **Error:** `payload.map`, type constraint issues
- **Fix:**
  ```ts
  // Note: Using `any[]` for payload is a workaround. For robust code,
  // check the library's (e.g., Recharts) documentation for the exact
  // type of the legend payload and use it instead.
  type CustomLegendProps = { payload?: any[]; verticalAlign?: string; };
  function CustomLegend({ payload = [], verticalAlign }: CustomLegendProps) {
    return payload.length ? (
      <div>{payload.map((item, i) => <div key={i}>{item.name ?? item.value}</div>)}</div>
    ) : null;
  }
  ```

---

## 5. Playwright Best Practices & Debugging

### Writing Robust Tests
- **Use User-Facing Locators**: Prioritize locators that are resilient to code changes.
  - **Best**: `page.getByRole()`, `page.getByText()`, `page.getByLabel()`
  - **Good (Project Standard)**: `page.getByTestId('your-id')`. This project uses `data-testid` as a standard, as noted in `TESTING.md`.
  - **Avoid**: Brittle, implementation-coupled selectors like XPath or class-based CSS selectors.
- **Use Web-First Assertions**: These assertions automatically wait for the condition to be met, making tests more reliable.
  - `await expect(locator).toBeVisible();`
  - `await expect(locator).toHaveText('Welcome');`
  - `await expect(page).toHaveURL(/.*login/);`
- **Isolate Tests**: Each test should run independently. Use `test.beforeEach` to set up a clean state for every test.

### Debugging Your E2E Tests
- **Playwright Inspector**: A powerful GUI tool for stepping through tests.
  ```bash
  # Run in debug mode
  PWDEBUG=1 npm run test:e2e
  ```
- **Trace Viewer**: A post-mortem tool that gives you a full trace of a test run, including DOM snapshots, network requests, and actions. Invaluable for debugging CI failures.
  ```bash
  # Run tests with tracing enabled (see playwright.config.ts)
  npm run test:e2e

  # View the trace of the last failed test
  npx playwright show-trace
  ```
- **VS Code Extension**: Use the official Playwright extension for a great in-editor debugging experience, including running tests with one click and seeing line-by-line execution.

### Handling Asynchronicity
- **Trust Auto-Waiting**: Playwright automatically waits for elements to be actionable before performing actions. You rarely need manual waits.
  - `page.locator(...).click()` will wait for the element to be visible, enabled, and stable.
- **When to Wait Explicitly**: Use explicit waits only when necessary, for example, waiting for a specific network response before asserting on the UI that depends on it.
  - `await page.waitForResponse(/api\/user/);`

---

## 6. Husky Hooks & Deprecation

### Symptoms
- `husky - install command is DEPRECATED`

### Fixes
- Use manual install:
  ```bash
  npx husky-init
  npm install
  npx husky add .husky/pre-commit "npm run lint:ci && npm run typecheck && npx lint-staged"
  git add .husky/pre-commit
  ```
- Ensure `"prepare": "husky"` is in `package.json` scripts

---

## 7. General Scalable Workflow

1. **Update configs**: ESLint, Prettier, TypeScript
2. **Fix TypeScript file errors**: Per-file, prefer explicit types/imports
3. **Audit dependencies**: Remove unused, monitor for updates
4. **Run and verify scripts**: `npm run lint`, `npm run typecheck`, `npm run test:e2e`
5. **Handle warnings**: Log, monitor, escalate only if blocking
6. **Document patches**: Use module augmentation, comments, and keep code portable
7. **For AI agents**: Always check for newer APIs, breaking changes, and provide migration guides in comments

---

## 8. Temporary vs. Proper Fixes

- **Temporary**: Type casts, skipLibCheck, ignoring warnings
- **Proper**: Module augmentation, explicit typing, updating configs, correct usage of APIs
- **Document all temporary fixes for later cleanup**

---

## 9. Extensibility & AI Usage

- Keep configs up-to-date with latest best practices
- Use explicit comments for AI agents on why a fix was chosen
- Regularly revisit deprecated APIs and migrate as needed
- Always provide both quick workarounds and long-term fixes

---

# AI Usage Guidance

- Use this map as context for any code review, debug, or refactor session.
- Always check for config updates before applying file-specific fixes.
- Prefer explicit, documented code changes to silent bypasses.
- When in doubt, check latest docs for ESLint, Prettier, TypeScript, Playwright, Husky, etc.

---

## Next Steps

- Fix ESLint config and remove `.eslintignore`
- Install Prettier plugins
- Apply TypeScript per-file fixes (see above)
- Rerun lint, typecheck, e2e tests
- Document all applied fixes and workarounds

---

# Ready for AI & Human Developers

_This troubleshooting map is designed for interactive use by AI agents and developers for robust, scalable code cleaning, debugging, and verification in modern Node/React/TypeScript/Playwright projects._
