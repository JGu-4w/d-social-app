"use client";

import {
  useDisconnect,
  useActiveWallet,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import WalletButton from "./WalletButton";

import styles from "../styles/Home.module.css";
import { contract } from "@/app/contract";
import Link from "next/link";
import { truncateAddress } from "../utils/truncate";

export default function UserStatus() {
  const wallet = useActiveWallet();
  const account = useActiveAccount();
  const { disconnect } = useDisconnect();

  const { data: myStatus, isLoading: isMyStatusLoading } = useReadContract({
    contract: contract,
    method: "getStatus",
    params: [account?.address || "0x0"],
  });

  return (
    <>
      {!account ? (
        <>
          <WalletButton />
          <p>Please connect your wallet.</p>
        </>
      ) : (
        <div className={styles.userContainer}>
          <div className={styles.statusHeader}>
            <Link
              href={`/account/${account.address}`}
              style={{ color: "white" }}
            >
              <p className={styles.connectedAddress}>
                {truncateAddress(account.address)}
              </p>
            </Link>
            <button onClick={() => disconnect(wallet!)}>Logout</button>
          </div>
          {!isMyStatusLoading && myStatus && (
            <div>
              <p className={styles.statusText}>{myStatus}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
