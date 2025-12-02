---
outline: deep
---

# Vue3 + TypeScript Best Practices

**Author: Li Wanjiang**
**Date: 2024-04-15**
**Tags: Frontend, Vue3, TypeScript**

---

## Introduction

At NexCore, we fully embrace Vue 3 Composition API and TypeScript. This not only improves code maintainability but also makes team collaboration smoother. This article summarizes some of our best practices in projects.

## 1. Type Definition Standards

### Props Definition
Instead of runtime declarations, use generic arguments for `defineProps`:

```typescript
interface Props {
  title: string;
  count?: number;
  tags: string[];
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});
```

### Emits Definition
Also use generic declarations to ensure type safety for event parameters:

```typescript
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'close'): void;
}>();
```

## 2. Composables

We extract business logic into independent Composable functions (Hooks), following the naming convention starting with `use`.

**Principles**:
*   **Input**: Accepts reactive data (Ref/Getter) or plain values.
*   **Output**: Returns reactive state and operation methods.
*   **Side Effects**: Automatically clean up side effects (such as timers, event listeners) in `onUnmounted`.

Example: `useWindowSize`

```typescript
import { ref, onMounted, onUnmounted } from 'vue';

export function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  const update = () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  };

  onMounted(() => window.addEventListener('resize', update));
  onUnmounted(() => window.removeEventListener('resize', update));

  return { width, height };
}
```

## 3. API Layer Encapsulation

We use Axios + TypeScript to encapsulate API requests, using interceptors to handle global Loading and error prompts.

```typescript
// types/api.ts
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// api/user.ts
export const getUserProfile = (id: string) => {
  return http.get<ApiResponse<UserProfile>>(`/users/${id}`);
};
```

## Conclusion

Although the introduction of TypeScript increases the initial writing cost, in medium and large projects, the intelligence prompts and refactoring confidence it brings are invaluable.
