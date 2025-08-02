React Performance Improvement Techniques

如何做状态提升（lifting state）或使用 context

性能优化手段（例如 useMemo, React.memo）

是否需要 WebSocket / polling 等机制来处理实时数据流

1. Use React.memo for Functional Components
2. Implement shouldComponentUpdate in Class Components
3. Use React.lazy and Suspense for Code Splitting
4. Optimize Context API Usage
5. Use useMemo and useCallback Hooks
6. Avoid Inline Functions in Render
7. Use the Profiler API
8. Optimize Images and Assets
9. Minimize Re-renders with Key Prop
10. Use Web Workers for Heavy Computation
11. Implement Throttling and Debouncing
12. Use Virtualization for Long Lists
13. Optimize State Management
14. Use PureComponent for Class Components
15. Avoid Unnecessary State Updates
16. Use Batching for State Updates
17. Optimize Event Handlers
18. Use CSS Transitions Instead of JavaScript Animations
19. Avoid Unnecessary Reconciliation
20. Profile and Monitor Performance Regularly
21. Use Third-Party Libraries Wisely
22. Implement Lazy Loading for Routes
23. Use Service Workers for Caching
24. Optimize Third-Party Dependencies
25. Use React DevTools for Performance Analysis
26. Avoid Using Index as Key in Lists
27. Use Fragment to Avoid Extra DOM Nodes
28. Optimize Render Logic
29. Use Error Boundaries for Error Handling
30. Keep Component Hierarchy Flat
31. Use Static Type Checking (TypeScript or PropTypes)
32. Optimize CSS with Critical Path CSS
