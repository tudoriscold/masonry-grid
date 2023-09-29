import React, { useEffect, useState, ReactNode } from "react";

interface MasonryProps {
  breakpointCols: number | { default?: number; [key: number]: number };
  className?: string;
  columnClassName?: string;
  children: ReactNode;
  columnAttrs?: React.HTMLAttributes<HTMLDivElement>;
}

const DEFAULT_COLUMNS = 2;
let lastRecalculateAnimationFrame: number;

const Masonry: React.FC<MasonryProps> = ({
  breakpointCols,
  className,
  columnClassName,
  children,
  columnAttrs
}) => {
  const [columnCount, setColumnCount] = useState<number>(DEFAULT_COLUMNS);

  const reCalculateColumnCountDebounce = () => {
    if (!window || !window.requestAnimationFrame) {
      // IE10+
      reCalculateColumnCount();
      return;
    }

    if (window.cancelAnimationFrame) {
      // IE10+
      window.cancelAnimationFrame(lastRecalculateAnimationFrame);
    }

    lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      reCalculateColumnCount();
    });
  };

  const reCalculateColumnCount = () => {
    const windowWidth = (window && window.innerWidth) || Infinity;
    let breakpointColsObject = breakpointCols;

    if (typeof breakpointColsObject !== "object") {
      breakpointColsObject = {
        default: breakpointColsObject || DEFAULT_COLUMNS
      };
    }

    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject.default || DEFAULT_COLUMNS;

    for (let breakpoint in breakpointColsObject) {
      const optBreakpoint = parseInt(breakpoint);
      const isCurrentBreakpoint =
        optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = breakpointColsObject[breakpoint];
      }
    }

    columns = Math.max(1, columns || 1);

    if (columnCount !== columns) {
      setColumnCount(columns);
    }
  };

  useEffect(() => {
    reCalculateColumnCount();

    // window may not be available in some environments
    if (typeof window !== "undefined") {
      window.addEventListener("resize", reCalculateColumnCountDebounce);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", reCalculateColumnCountDebounce);
      }
    };
  }, []);

  const itemsInColumns = () => {
    const currentColumnCount = columnCount;
    const itemsInColumns = new Array(currentColumnCount);

    // Force children to be handled as an array
    const itemsArray = React.Children.toArray(children);

    for (let i = 0; i < itemsArray.length; i++) {
      const columnIndex = i % currentColumnCount;

      if (!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(itemsArray[i]);
    }

    return itemsInColumns;
  };

  const renderColumns = () => {
    const childrenInColumns = itemsInColumns();
    const columnWidth = `${100 / childrenInColumns.length}%`;

    return childrenInColumns.map((items, i) => (
      <div
        key={i}
        style={{ width: columnWidth }}
        className={columnClassName}
        {...columnAttrs}>
        {items}
      </div>
    ));
  };

  return <div className={className}>{renderColumns()}</div>;
};

export default Masonry;
