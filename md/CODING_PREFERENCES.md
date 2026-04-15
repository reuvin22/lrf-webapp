# CRUD Architecture Guide — AI Helper Instructions

This document provides instructions for an AI coding assistant to implement a clean, centralized CRUD (Create, Read, Update, Delete) architecture using **React JS** (plain JavaScript — no TypeScript). All data operations must be organized in a single folder and consumed by other files via imports. This ensures a maintainable, scalable, and readable codebase.

---

## 1. Folder Structure

All CRUD logic lives under `src/services/`. Each domain entity gets its own file. A barrel `index.js` re-exports everything for clean imports.

```
src/
├── services/
│   ├── index.js              # Barrel file — re-exports all services
│   ├── userService.js         # CRUD for Users
│   ├── projectService.js      # CRUD for Projects
│   └── taskService.js         # CRUD for Tasks
├── pages/
├── components/
└── hooks/
```

> **Rule:** No component or page file should contain raw data-fetching or mutation logic. All database/API calls go through `src/services/`.

---

## 2. Service File Template

Every service file must follow this consistent pattern. Use the template below as a starting point for each new entity.

```js
// src/services/entityService.js

import { supabase } from "../integrations/supabase/client";

/**
 * Fetch all entities.
 * @param {Object} [filters] - Optional filter parameters.
 * @returns {Promise<Array>} List of entities.
 */
export async function getEntities(filters) {
  let query = supabase.from("entities").select("*");

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to fetch entities: ${error.message}`);
  return data ?? [];
}

/**
 * Fetch a single entity by ID.
 * @param {string} id - The entity ID.
 * @returns {Promise<Object>} The entity object.
 */
export async function getEntityById(id) {
  const { data, error } = await supabase
    .from("entities")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(`Failed to fetch entity: ${error.message}`);
  return data;
}

/**
 * Create a new entity.
 * @param {Object} payload - The entity data to insert.
 * @returns {Promise<Object>} The created entity.
 */
export async function createEntity(payload) {
  const { data, error } = await supabase
    .from("entities")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(`Failed to create entity: ${error.message}`);
  return data;
}

/**
 * Update an existing entity by ID.
 * @param {string} id - The entity ID.
 * @param {Object} payload - The fields to update.
 * @returns {Promise<Object>} The updated entity.
 */
export async function updateEntity(id, payload) {
  const { data, error } = await supabase
    .from("entities")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update entity: ${error.message}`);
  return data;
}

/**
 * Delete an entity by ID.
 * @param {string} id - The entity ID.
 * @returns {Promise<void>}
 */
export async function deleteEntity(id) {
  const { error } = await supabase
    .from("entities")
    .delete()
    .eq("id", id);

  if (error) throw new Error(`Failed to delete entity: ${error.message}`);
}
```

---

## 3. Barrel File (`index.js`)

The barrel file re-exports all services so consumers use a single import path.

```js
// src/services/index.js

export * from "./userService";
export * from "./projectService";
export * from "./taskService";
```

---

## 4. Consuming Services in Components

Components and pages never call the database directly. They import from `src/services/`.

### With React Query (recommended)

```jsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEntities, createEntity, deleteEntity } from "../services";

function EntityList() {
  const queryClient = useQueryClient();

  const { data: entities, isLoading } = useQuery({
    queryKey: ["entities"],
    queryFn: () => getEntities(),
  });

  const createMutation = useMutation({
    mutationFn: createEntity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entities"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEntity,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["entities"] }),
  });

  // ... render UI using entities, createMutation, deleteMutation
}
```

### With a Custom Hook (optional abstraction)

```js
// src/hooks/useEntities.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEntities, createEntity, updateEntity, deleteEntity } from "../services";

export function useEntities() {
  const queryClient = useQueryClient();
  const queryKey = ["entities"];

  const query = useQuery({ queryKey, queryFn: () => getEntities() });

  const create = useMutation({
    mutationFn: (payload) => createEntity(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const update = useMutation({
    mutationFn: ({ id, payload }) => updateEntity(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  const remove = useMutation({
    mutationFn: (id) => deleteEntity(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey }),
  });

  return { ...query, create, update, remove };
}
```

---

## 5. Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Service file | `camelCase` + `Service` | `userService.js` |
| Function names | `verb` + `Entity` | `getUsers`, `createTask` |
| Query keys | Lowercase array | `["users"]`, `["tasks", id]` |
| Hooks | `use` + `Entity` | `useUsers`, `useTasks` |

---

## 6. Rules for the AI Helper

1. **Never write database calls inside components or pages.** Always create or use a service function.
2. **One file per entity** in `src/services/`. Do not mix user logic with task logic.
3. **Always export through `index.js`.** Every new service file must be added to the barrel.
4. **Use JSDoc comments** to document function parameters and return values since there are no TypeScript types.
5. **Handle errors inside service functions.** Throw descriptive errors; let the UI layer catch and display them.
6. **Use React Query** for all data fetching and mutations in components.
7. **Keep services pure.** No UI logic, no toast notifications, no navigation — only data in and data out.
8. **All files use `.js` / `.jsx` extensions.** Do not use `.ts` or `.tsx`.

---

## 7. Adding a New Entity — Checklist

When a new entity is introduced, follow these steps in order:

- [ ] Create `src/services/entityService.js` using the template above
- [ ] Add `export * from "./entityService"` to `src/services/index.js`
- [ ] Create `src/hooks/useEntity.js` if the entity will be used in multiple components
- [ ] Use the service/hook in the relevant page or component

---

*This document should be referenced whenever new features or entities are added to the system. It enforces separation of concerns and keeps the codebase clean, testable, and easy to navigate.*
