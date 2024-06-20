"use client";

import { ConnectButton } from "thirdweb/react";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { client } from "../app/client";
import { chain } from "../app/chain";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  walletConnect(),
];

export default function WalletButton() {
  return (
    <div>
      <ConnectButton
        client={client}
        chain={chain}
        wallets={wallets}
        connectModal={{ size: "compact" }}
      />
    </div>
  );
}
