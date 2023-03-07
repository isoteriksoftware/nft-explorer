/* eslint-disable @next/next/no-img-element */
import CustomAppBar from "@/components/CustomAppBar";
import { Box, Grid, Stack, Toolbar, Typography } from "@mui/material";
import { Button, Card, Modal, NftCard } from "@web3uikit/core";
import { useState } from "react";

interface NFTCardWrapperProps {
  nft?: any;
  onSelected: (nft: any) => void;
}

const NFTCardWrapper = ({
  onSelected,
  nft = {
    amount: "1",
    block_number: "15957801",
    block_number_minted: "12346998",
    contract_type: "ERC721",
    last_metadata_sync: "2022-10-04T14:50:00.573Z",
    last_token_uri_sync: "2022-10-04T14:49:59.308Z",
    metadata:
      '{"image":"ipfs://QmZcRZu2cMJG9KUSta6WTrRek647WSG5mJZLhimwbC2y56","attributes":[{"trait_type":"Background","value":"Aquamarine"},{"trait_type":"Fur","value":"Pink"},{"trait_type":"Eyes","value":"3d"},{"trait_type":"Mouth","value":"Bored"},{"trait_type":"Clothes","value":"Service"}]}',
    minter_address: "0x8be13ff71224ad525f0474553aa7f8621b856bd4",
    name: "BoredApeYachtClub",
    owner_of: "0x6682f185d982bd341a0e1dfccbc2562e3cb1eea7",
    symbol: "BAYC",
    token_address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    token_hash: "61554743720b60143f35e7adcc2a6fc7",
    token_id: "4789",
    token_uri:
      "https://ipfs.moralis.io:2053/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/4789",
    transfer_index: [15957801, 92, 206, 0],
  },
}: NFTCardWrapperProps) => {
  const parseImageUrl = () => {
    const url = JSON.parse(nft.metadata).image as string;
    if (!url.includes("ipfs")) return url;

    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  return (
    <Grid
      item
      xs={12}
      md={3}
      sx={{
        "& .image": {
          width: "100%",
          height: "300px",
        },
      }}
    >
      <Card
        description={`${nft.name} #${nft.token_id}`}
        title={`${nft.symbol} (${nft.amount})`}
        onClick={() => onSelected(nft)}
      >
        <img src={parseImageUrl()} alt="NFT" className="image" />
      </Card>
    </Grid>
  );
};

const Index = () => {
  const [selectedNft, setSelectedNft] = useState<any>(null);
  const [nftModalOpen, setNftModalOpen] = useState(false);
  const [chain, setChain] = useState("ethereum");

  const onNftSelected = (selected: any) => {
    setSelectedNft(selected);
    setNftModalOpen(true);
  };

  return (
    <div>
      <CustomAppBar />

      <Box
        sx={{ marginTop: "110px", padding: "0 40px", paddingBottom: "40px" }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "20px" }}
        >
          Discovered NFTs
        </Typography>

        <Grid container justifyContent="center" columnGap="30px">
          <NFTCardWrapper onSelected={onNftSelected} />
        </Grid>

        <Modal
          isVisible={nftModalOpen}
          onCloseButtonPressed={() => setNftModalOpen(false)}
          title={
            <Typography color="#68738D" variant="h5">
              NFT Details
            </Typography>
          }
          customFooter={
            <Stack
              direction="row"
              justifyContent="center"
              sx={{ width: "100%", marginTop: "20px" }}
            >
              <Button
                theme="outline"
                text="Purchase NFT"
                size="large"
                onClick={() => window.open(selectedNft.token_uri, "_blank")}
              />
            </Stack>
          }
          width="600px"
        >
          <NftCard chain={chain} moralisApiResult={selectedNft} />
        </Modal>
      </Box>
    </div>
  );
};

export default Index;
