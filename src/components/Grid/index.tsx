import React from "react";
import styles from "./Grid.module.css";

type BoxProps = {
  color?: string;
  children?: React.ReactNode;
};

export function Box({ color, children, ...rest }: BoxProps) {
  return (
    <div
      className={styles.box}
      style={{
        backgroundColor: color ?? "LightBlue",
        ...rest,
      }}
    >
      {children}
    </div>
  );
}

export default function Grid({ numItems = 20, children, ...rest }) {
  return (
    <div style={{ position: "relative", height: "300px", overflowY: "scroll" }}>
      <div
        className={styles.base}
        style={{
          zIndex: 10,
          ...rest,
        }}
      >
        {[...Array(numItems).fill(0)].map((_, i) => (
          <Box key={i} color="#B97A57">
            {i}
          </Box>
        ))}
      </div>

      <div
        className={styles.base}
        style={{
          zIndex: 20,
          ...rest,
        }}
      >
        {children}
      </div>
    </div>
  );
}
