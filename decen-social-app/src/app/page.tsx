import styles from "../../styles/Home.module.css";
import UserStatus from "../../components/UserStatus";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <UserStatus />
        </div>
      </div>
    </main>
  );
}
