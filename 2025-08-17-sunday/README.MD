# DoubleVerify 面试准备 —— 实时订单簿 UI 白板题示范

## 目标
设计一个**实时交易订单簿（Order Book UI）**，要求：
- 每秒上千条更新（WebSocket 推送）
- 用户能快速浏览价格和成交量
- 页面保持流畅不卡顿

优先保证性能和读体验，其次增强交互（如自选价位）。

---

## 1. 总体架构
- **数据源**：WebSocket 增量更新 + REST 快照
- **通道**：主线程只渲染，Web Worker 做数据处理
- **状态层**：不可变数据 + 批处理队列，读写分离
- **渲染层**：虚拟化列表（`react-window` / AG Grid），requestAnimationFrame 节流刷新

---

## 2. 数据流
1. **初始化**
   - 拉一次 REST 快照作为基线
   - 建立 WebSocket，监听增量更新
2. **增量消费（Worker 内）**
   - 更新 `bids` 和 `asks`，合并同价位
3. **批量上屏（主线程）**
   - 每 16-33ms 批量发送 delta
   - 使用 requestAnimationFrame 渲染

**关键点**：批量更新而非逐条 setState

---

## 3. 性能优化
- 虚拟化渲染：只渲染可视区
- 批量更新：16ms rAF 或 setTimeout
- 不可变/结构共享，浅拷贝替换
- 稳定 key（price） + memo
- Worker 预处理排序/合并
- 背压/降载策略：合并洪峰帧、降低刷新频率

---

## 4. 组件与状态设计（React）
- **布局**
  - `<OrderBook>`：容器，处理订阅
  - `<SideTable side="bids" | "asks">`
  - `<PriceRow>`：单行
  - `<Toolbar>`：排序/过滤/精度控制
- **状态划分**
  - 全局 store：行数据 + 元数据
  - 局部 state：排序、精度、选中行
- **Hook 封装**
  - `useOrderBook()`：对外提供已排序数据和事件

---

## 5. 一致性与边界
- 序号校验：断档重拉快照
- 原子更新：同一帧内更新 bids/asks
- 数值精度：整数单位存储，展示时格式化
- 断线重连：指数退避 + 快照重放

---

## 6. 可观测性与测试
- **指标**：帧率、每帧渲染行数、delta 应用时间、WS 丢包率
- **测试**
  - 单元测试：价格合并/删除逻辑、序号断档恢复
  - 集成测试：Worker → 主线程消息契约
  - 性能测试：回放录制流，验证 1k+ msg/s 不卡顿

---

## 7. 技术选型与取舍
- 虚拟化库：AG Grid（`deltaRowDataMode` + `getRowId`）或 react-window
- 状态库：轻量首选 Zustand，复杂共享 Redux Toolkit
- 优先做：快照 + 增量 + 虚拟化 + 批更新
- 其余优化按观测数据迭代

---

## 8. 示例伪代码

```ts
// Worker (pseudo)
onmessage = (ev) => {
  batch.push(...ev.data);
  if (ticking) return;
  ticking = true;
  setTimeout(() => {
    const deltas = coalesce(batch);
    applyToBook(orderBook, deltas);
    const view = topN(orderBook, N);
    postMessage({ view, lastSeq });
    batch = []; ticking = false;
  }, 16);
};

// Main thread (React)
useEffect(() => {
  worker.onmessage = ({ data }) => {
    requestAnimationFrame(() => setBookState(data.view));
  };
}, []);
