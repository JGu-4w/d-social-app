"use client";

import { CONTRACT } from "@/app/contract";
import { prepareEvent } from "thirdweb";
import { useContractEvents } from "thirdweb/react";
import EventCard from "./EventCard";

export default function StatusEvents() {
  const preparedEvent = prepareEvent({
    signature:
      "event StatusUpdated(address indexed user, string newStatus, uint256 timestamp)",
  });

  const events = useContractEvents({
    contract: CONTRACT,
    events: [preparedEvent],
  });

  return (
    <div>
      {/* 加载完毕后开始渲染数据 */}
      {events.data &&
        events.data
          .slice(0, 30)
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
