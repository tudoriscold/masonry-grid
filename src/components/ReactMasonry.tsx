import React, {
  useEffect,
  useState,
  ReactNode,
  HTMLAttributes,
  CSSProperties
} from "react";

interface MasonryProps {
  breakpointCols?: number | { default?: number; [key: number]: number };
  className?: string;
  columnClassName?: string;
  children?: ReactNode;
  columnAttrs?: HTMLAttributes<HTMLDivElement>;
  column?: HTMLAttributes<HTMLDivElement>; // Deprecated alias
}

const DEFAULT_COLUMNS = 2;

const Masonry: React.FC<MasonryProps> = ({
  breakpointCols,
  className,
  columnClassName,
  children,
  columnAttrs,
  column // Deprecated alias
}) => {
  const [columnCount, setColumnCount] = useState<number>(DEFAULT_COLUMNS);
  let _lastRecalculateAnimationFrame: number | undefined;

  useEffect(() => {
    const reCalculateColumnCountDebounce = () => {
      if (!window || !window.requestAnimationFrame) {
        // IE10+
        reCalculateColumnCount();
        return;
      }

      if (window.cancelAnimationFrame && _lastRecalculateAnimationFrame) {
        // IE10+
        window.cancelAnimationFrame(_lastRecalculateAnimationFrame);
      }

      _lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
        reCalculateColumnCount();
      });
    };

    const reCalculateColumnCount = () => {
      const windowWidth = (window && window.innerWidth) || Infinity;
      let breakpointColsObject = breakpointCols;

      // Allow passing a single number to `breakpointCols` instead of an object
      if (typeof breakpointColsObject !== "object") {
        breakpointColsObject = {
          default: parseInt(String(breakpointColsObject)) || DEFAULT_COLUMNS
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

      columns = Math.max(1, parseInt(String(columns)) || 1);

      if (columnCount !== columns) {
        setColumnCount(columns);
      }
    };

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
  }, [breakpointCols, columnCount]);

  const itemsInColumns = () => {
    const currentColumnCount = columnCount;
    const itemsInColumns = new Array<ReactNode[]>(currentColumnCount);

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
    let classNameOutput = columnClassName;

    if (classNameOutput && typeof classNameOutput !== "string") {
      console.error(
        "[Masonry]",
        'The property "columnClassName" requires a string'
      );

      // This is a deprecated default and will be removed soon.
      if (typeof classNameOutput === "undefined") {
        classNameOutput = "my-masonry-grid_column";
      }
    }

    const columnAttributes = {
      ...column,
      ...columnAttrs,
      style: {
        ...columnAttrs?.style,
        width: columnWidth
      },
      className: classNameOutput
    };

    return childrenInColumns.map((items, i) => (
      <div {...columnAttributes} key={i}>
        {items}
      </div>
    ));
  };

  let classNameOutput = className;

  if (typeof classNameOutput !== "string") {
    console.error("[Masonry]", 'The property "className" requires a string');

    // This is a deprecated default and will be removed soon.
    if (typeof classNameOutput === "undefined") {
      classNameOutput = "my-masonry-grid";
    }
  }

  return <div className={classNameOutput}>{renderColumns()}</div>;
};

export default Masonry;
