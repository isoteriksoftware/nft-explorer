import { initMoralis } from "@/utils/helpers";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Initialize moralis
  await initMoralis();

  // Get the address
  const address =
    req.query.address || "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const chain = EvmChain.create((req.query.chain as string) || "0x1");

  // Get the NFTS
  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    address: address as string,
    chain: chain,
  });

  res.status(200).json(nfts);
}
