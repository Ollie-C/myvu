import React from "react";
import styles from "./Layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <div>
      <header className={styles.header}>
        <h1>myvu</h1>
      </header>
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
