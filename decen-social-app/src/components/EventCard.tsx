import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { truncateAddress } from "../../utils/truncate";

type EventCardProps = {
  walletAddress: string;
  newStatus: string;
  timeStamp: bigint;
};

export default function EventCard(props: EventCardProps) {
  // 将 BigInt 类型时间戳转化为 Date 对象
  const date = new Date(Number(props.timeStamp) * 1000);

  return (
    <div className={styles.eventCard}>
      <div className={styles.eventHeader}>
        {/* 设置账户地址的链接 */}
        <Link
          href={`account/${props.walletAddress}`}
          style={{ color: "white" }}
        >
          {/* 展示截取地址 */}
          <p className={styles.connectedAddress}>
            {truncateAddress(props.walletAddress)}
          </p>
        </Link>
        {/* 格式化日期 */}
        <p style={{ fontSize: "0.75rem" }}>{date.toLocaleString()}</p>
      </div>
      {/* 当前用户状态 */}
      <p style={{ fontSize: "16px" }}>{props.newStatus}</p>
    </div>
  );
}
