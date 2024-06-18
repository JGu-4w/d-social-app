import { defineChain } from "thirdweb";

export const chain = defineChain({
  id: 59141,
  explorers: [
    {
      name: "Etherscan",
      url: "https://sepolia.lineascan.build",
      standard: "EIP3091",
    },
  ],
  name: "Linea Sepolia",
  nativeCurrency: {
    name: "Linea Ether",
    symbol: "ETH",
    decimals: 18,
  },
  networkId: 59141,
  rpc: ["https://rpc.sepolia.linea.build"],
  shortName: "linea-sepolia",
  chain: "ETH",
  chainId: 59141,
  testnet: true,
  slug: "linea-sepolia",
  title: "Linea Sepolia Testnet",
});
