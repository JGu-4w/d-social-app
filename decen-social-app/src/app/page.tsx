"use client";

import styles from "@/styles/Home.module.css";
import UserStatus from "../components/UserStatus";
import StatusEvents from "../components/StatusEvents";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <UserStatus />
          {/* 增加状态流组件 */}
          <h3>Status Feed:</h3>
          <StatusEvents />
        </div>
      </div>
    </main>
  );
}
