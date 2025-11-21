---
outline: deep
---

# Vue3 + TypeScript 最佳实践

**作者：李万江**  
**日期：2024-04-15**  
**标签：Frontend, Vue3, TypeScript**

---

## 引言

在 NexCore，我们全面拥抱 Vue 3 Composition API 与 TypeScript。这不仅提升了代码的可维护性，也让团队协作更加顺畅。本文总结了我们在项目中的一些最佳实践。

## 1. 类型定义规范

### Props 定义
不再使用运行时声明，而是使用 `defineProps` 的泛型参数：

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

### Emits 定义
同样使用泛型声明，确保事件参数类型安全：

```typescript
const emit = defineEmits<{
  (e: 'update', value: string): void;
  (e: 'close'): void;
}>();
```

## 2. 组合式函数 (Composables)

我们将业务逻辑抽离为独立的 Composable 函数（Hook），遵循 `use` 开头的命名约定。

**原则**：
*   **输入**：接收响应式数据（Ref/Getter）或普通值。
*   **输出**：返回响应式状态与操作方法。
*   **副作用**：在 `onUnmounted` 中自动清理副作用（如定时器、事件监听）。

示例：`useWindowSize`

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

## 3. API 层封装

我们使用 Axios + TypeScript 封装 API 请求，利用拦截器处理全局 Loading 与错误提示。

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

## 结语

TypeScript 的引入虽然增加了初期的编写成本，但在中大型项目中，它带来的智能提示与重构信心是无价的。
