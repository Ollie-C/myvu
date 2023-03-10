import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import styles from "./Layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { user } = useUser();
  return (
    <div>
      <header className={styles.header}>
        <h1>myvu</h1>
        <div className={styles.accountCTA}>
          {user ? (
            <a href="/api/auth/logout">LOGOUT</a>
          ) : (
            <a href="/api/auth/login">LOGIN</a>
          )}
        </div>
      </header>
      <main className={styles.main}>{props.children}</main>
    </div>
  );
};

export default Layout;
