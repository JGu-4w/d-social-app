"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  useDisconnect,
  useActiveWallet,
  useReadContract,
  TransactionButton,
} from "thirdweb/react";
import { prepareContractCall } from "thirdweb";

import styles from "../../styles/Home.module.css";
import WalletButton from "./WalletButton";
import { CONTRACT } from "@/app/contract";
import { truncateAddress } from "../../utils/truncate";

export default function UserStatus() {
  const wallet = useActiveWallet();
  const account = wallet?.getAccount();

  const { disconnect } = useDisconnect();

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const characterDecoration =
    characterCount >= 140
      ? styles.characterCountOver
      : styles.characterCountUnder;
  const [newStatus, setNewStatus] = useState("");

  const { data: myStatus, isLoading: isMyStatusLoading } = useReadContract({
    contract: CONTRACT,
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
            {/* 展示当前账户地址 */}
            <Link
              href={`/account/${account.address}`}
              style={{ color: "white" }}
            >
              <p className={styles.connectedAddress}>
                {truncateAddress(account.address)}
              </p>
            </Link>
            {/* 退出登陆按钮 */}
            <button onClick={() => disconnect(wallet!)}>Logout</button>
          </div>
          {/* 展示当前账户的状态 */}
          {!isMyStatusLoading && myStatus && (
            <div>
              <p className={styles.statusText}>{myStatus}</p>
            </div>
          )}
          {/* 更新状态模态框按钮 */}
          <button
            className={styles.updateButton}
            onClick={() => setIsStatusModalOpen(true)}
          >
            Update
          </button>

          {isStatusModalOpen && (
            <div className={styles.statusModalContainer}>
              <div className={styles.statusModal}>
                <div className={styles.statusModalHeader}>
                  <p>New Status:</p>
                  <button onClick={() => setIsStatusModalOpen(false)}>
                    close
                  </button>
                </div>
                <textarea
                  value={newStatus}
                  onChange={(e) => {
                    setNewStatus(e.target.value);
                    setCharacterCount(e.target.value.length);
                  }}
                  placeholder="Enter your status"
                ></textarea>
                <div className={styles.characterCountContainer}>
                  <p className={characterDecoration}>{characterCount}/140</p>
                </div>
                {/* 发起链上交易 */}
                <TransactionButton
                  transaction={() =>
                    prepareContractCall({
                      contract: CONTRACT,
                      method: "setStatus",
                      params: [newStatus],
                    })
                  }
                  disabled={characterCount === 0 || characterCount > 140}
                  onTransactionSent={() => console.log("Updating...")}
                  onTransactionConfirmed={() => {
                    setIsStatusModalOpen(false);
                    setNewStatus("");
                  }}
                >
                  Update Status
                </TransactionButton>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
