// VirtualizedTable.tsx
import React, { useRef, useState, useEffect, useCallback, CSSProperties, memo } from "react";

type VirtualizedTableProps<T> = {
  data: T[];
  rowHeight: number;           // 固定行高（px）
  height: number;              // 容器可视高度（px）
  overscan?: number;           // 向上/下额外渲染的行数
  renderRow: (item: T, index: number) => React.ReactNode;
  className?: string;
  containerStyle?: CSSProperties;
};

export function VirtualizedTable<T>({
  data,
  rowHeight,
  height,
  overscan = 3,
  renderRow,
  className,
  containerStyle,
}: VirtualizedTableProps<T>) {
  const total = data.length;
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const visibleCount = Math.ceil(height / rowHeight);

  // compute indexes
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const endIndex = Math.min(total - 1, Math.floor(scrollTop / rowHeight) + visibleCount + overscan);

  const offsetY = startIndex * rowHeight;
  const visibleData = data.slice(startIndex, endIndex + 1);

  // scroll handler with rAF throttle
  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    let ticking = false;
    const onScroll = (e: Event) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollTop((e.target as Element).scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    node.addEventListener("scroll", onScroll, { passive: true });
    return () => node.removeEventListener("scroll", onScroll);
  }, []);

  const containerStyles: CSSProperties = {
    height,
    overflow: "auto",
    position: "relative",
    willChange: "transform",
    ...containerStyle,
  };

  const totalHeight = total * rowHeight;

  return (
    <div ref={viewportRef} className={className} style={containerStyles}>
      {/* 占位高度，保持滚动条 */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {/* 实际渲染的窗口，用 transform 把它移动到 offset */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${offsetY}px)`,
          }}
        >
          {visibleData.map((item, i) => {
            const realIndex = startIndex + i;
            // 建议 renderRow 返回一个 memoized component for performance
            return (
              <div key={realIndex} style={{ height: rowHeight, boxSizing: "border-box" }}>
                {renderRow(item, realIndex)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
