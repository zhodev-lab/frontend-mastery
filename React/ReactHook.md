when to use useContext.

1. theme context dark / light mode
2. user context for authentication (用户登陆信息)
3. language context for internationalization (i18n)
4. settings context for application preferences
5. notifications context for real-time alerts
6. modal context for managing modal visibility
（权限信息）

useMemo and context value
- Use `useMemo` to memoize context values to prevent unnecessary re-renders of components (避免频繁re-render)

```jsx
import React, { createContext, useState, useMemo } from 'react'
const MyContext = createContext()

export function MyProvider({ children }) {
  const [count, setCount] = useState(0)

  const value = useMemo(() => ({ count, setCount }), [count])

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}
```

useMemo 缓存计算结果记忆值
useMemo useless recalculation
- Use `useMemo` to cache expensive calculations or derived state to avoid recalculating on every render.

but use `useMemo` judiciously, as overusing it can lead to complexity and make the code harder to read.

but it's important to note that `useMemo` is not a silver bullet. It should be used when there are clear performance benefits, such as preventing expensive calculations on every render.
