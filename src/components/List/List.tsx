import React, { forwardRef } from "react";
import styles from "./List.module.scss";

export interface Props {
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  horizontal?: boolean;
}

export const List = forwardRef<HTMLUListElement, Props>(
  ({ children, columns = 1, horizontal, style }: Props, ref) => {
    return (
      <ul
        ref={ref}
        style={{ ...style } as React.CSSProperties}
        className={`
        grid gap-3 px-5 pt-5 m-3 transition
        ${columns ? `grid-cols-${columns}` : `grid-cols-1`}
        
        after:content-[''] after:h-3
        ${columns ? `after:col-start-${columns}` : `after:col-start-1`}
        
        ${horizontal && "w-full grid-flow-col"}`}
      >
        {children}
      </ul>
    );
  }
);
