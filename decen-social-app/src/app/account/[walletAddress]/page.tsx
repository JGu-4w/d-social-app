"use client";

import { useRouter } from "next/navigation";
import { prepareEvent } from "thirdweb";
import { useContractEvents } from "thirdweb/react";

import { CONTRACT } from "../../contract";
import styles from "@/styles/Home.module.css";
import EventCard from "../../../components/EventCard";

export default function AccountFeed({
  params,
}: {
  params: { walletAddress: string };
}) {
  const router = useRouter();

  const walletAddress = params.walletAddress;
  const preparedEvent = prepareEvent({
    signature:
      "event StatusUpdated(address indexed user, string newStatus, uint256 timestamp)",
    filters: { user: walletAddress as `0x${string}` | undefined },
  });

  const { data: userEvents } = useContractEvents({
    contract: CONTRACT,
    events: [preparedEvent],
  });

  return (
    <div className={styles.container} style={{ maxWidth: "500px" }}>
      <button onClick={() => router.push("/")} className={styles.updateButton}>
        Back
      </button>
      <h1>Account Feed</h1>
      <p style={{ fontSize: "0.75rem" }}>{walletAddress}</p>
      <h3>Latest Updates:</h3>
      {userEvents &&
        userEvents
          .slice(0, 20)
          .map((event, index) => (
            <EventCard
              key={index}
              walletAddress={event.args.user}
              newStatus={event.args.newStatus}
              timeStamp={event.args.timestamp}
            />
          ))}
    </div>
  );
}
