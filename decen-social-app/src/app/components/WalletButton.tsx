"use client";

import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";
import { client } from "../client";
import { chain } from "../chain";

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

export default function WalletButton() {
  return (
    <div>
      <ConnectButton client={client} chain={chain} wallets={wallets} />
    </div>
  );
}
