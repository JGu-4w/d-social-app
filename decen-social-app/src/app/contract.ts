import { getContract } from "thirdweb";
import { client } from "./client";
import { chain } from "./chain";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_ABI = [
  {
    type: "event",
    name: "StatusUpdated",
    inputs: [
      {
        type: "address",
        name: "user",
        indexed: true,
        internalType: "address",
      },
      {
        type: "string",
        name: "newStatus",
        indexed: false,
        internalType: "string",
      },
      {
        type: "uint256",
        name: "timestamp",
        indexed: false,
        internalType: "uint256",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "getStatus",
    inputs: [
      {
        type: "address",
        name: "_user",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setStatus",
    inputs: [
      {
        type: "string",
        name: "_status",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "statuses",
    inputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    outputs: [
      {
        type: "string",
        name: "",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
] as const;

export const contract = getContract({
  client,
  chain: chain,
  address: CONTRACT_ADDRESS!,
  abi: CONTRACT_ABI,
});
