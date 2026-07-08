# Coding Convention

## Component
- Interface naming: always suffix with `Props` (e.g. `CardProps`, `ChipProps`)
- Avoid meaningless `<div>`; use fragment `<>` at component root
- Use self-closing when no children: `<Component />`
- Design system components must have zero or minimal business logic (Headless UI)
- Domain-specific components go inside `apps/web/`, not the design system

## Folder Naming
- Always lowercase
- Always plural (add `s`)
- kebab-case only (e.g. `shared/inputs`, `widgets`, `user-pages`)

## Types
- Prefer `interface` over `type`
- Use `type` only for union, tuple, or literal type definitions
  - ✅ `type Status = 'loading' | 'success' | 'error'`
  - ✅ `type Position = [number, number]`

## Variables
- Never use `var`
- Declare in order: `const` → `let`
- Never use `+` for string concatenation → use template literals
- Constants: UPPER_SNAKE_CASE (e.g. `API_KEY`)
- Variable names must be meaningful (long is OK)
- Boolean variables must be prefixed with `is` (e.g. `isActive`)
- `is` prefix is exclusive to booleans

## Key Usage
- ❌ Never use random values for `key`
- ✅ Static lists (never reordered): `index` is acceptable
- ✅ Dynamic lists (add/sort): must use unique `id`
- ✅ Stateless result lists (pagination, search): `index` is acceptable

## Functions
- Name format: verb + noun (clearly describes what it does)
  - `get`: returns a value
  - `create`: creates a new value from existing variables
  - `check`: validates logic
  - `convert`: transforms input to another form
  - `add` / `minus`: adds or subtracts
  - `filter`: takes array, returns filtered result
- Event handler functions must be prefixed with `handle`
  - `handle` prefix is exclusive to event handlers
  - e.g. `handleResetClick`, `handleSubmitClick`
- Utility functions returning boolean: prefix with `has` (e.g. `hasEmail`)
- Shared utilities (used in 2+ domains) go in `utils/`
- Always use arrow functions

## Arrays & Destructuring
- Array copy: use spread operator (e.g. `const copies = [...originals]`)
- Prefer `forEach` / `map` over `for`
- Always use destructuring assignment

## Style
- Use semantic HTML tags (refer to MDN)
- No unnecessary `<div>` with UI dependencies
- Wrapper `<div>` must be named `container`

## React
- HOC prefix: `with` (e.g. `withAuth`)
- Context suffix: `Context` (e.g. `UserContext`)
- Import React types individually
  - ❌ `React.ReactNode`
  - ✅ `import { ReactNode } from 'react'`
- React Compiler is enabled; avoid unnecessary `useMemo` / `useCallback`

## API Types (openapi-typescript)
- Generated schema lives in `src/shared/types/schema.d.ts`
  - Regenerate with `pnpm run generate:types`; never edit it manually
- Access types through the `paths` interface, aliased **per domain** in that domain's `types/` folder (not in `shared/types/`)
  - `shared/types/` holds only the generated schema + global common wrappers (e.g. `ApiResponse<T>`)
- Unwrap to `data`; suffix with `Response` / `Request`
  - e.g. `type NoticeResponse = paths['/groups/{groupId}/notices']['get']['responses']['200']['content']['*/*']['data']`

## Query Keys
- Use the `queryKeys` factory in `src/shared/query/query-keys.ts`; never hardcode key strings
- Hierarchy: `all → lists() / list() / detail()` so a parent key invalidates its children
- Add new domains as entries on the factory object