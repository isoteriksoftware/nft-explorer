/* eslint-disable @next/next/no-img-element */
import CustomAppBar, { Chain } from "@/components/CustomAppBar";
import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Button, Card, Modal, NftCard, useNotification } from "@web3uikit/core";
import { useState } from "react";

interface NFTCardWrapperProps {
  nft: any;
  onSelected: (nft: any) => void;
}
const NFTCardWrapper = ({ onSelected, nft }: NFTCardWrapperProps) => {
  const parseImageUrl = () => {
    const url = JSON.parse(nft.metadata).image as string;
    if (!url.includes("ipfs")) return url;

    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      sx={{
        "& .image": {
          width: "100%",
          height: "300px",
        },
      }}
    >
      <Card
        description={`${nft.name} #${nft.token_id}`.substring(0, 20) + "..."}
        title={`${nft.symbol}`}
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
  const [chain, setChain] = useState<Chain>("ethereum");
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState<any[]>([]);
  const dispatchNotification = useNotification();

  const onNftSelected = (selected: any) => {
    setSelectedNft(selected);
    setNftModalOpen(true);
  };

  const onSelectChain = (chainId: string, chainName: Chain) => {
    setChain(chainName);
  };

  const doFetchNfts = async (address: string, chainId: string) => {
    setIsLoading(true);
    setNfts([]);

    const onError = () => {
      dispatchNotification({
        type: "error",
        title: "Oops!",
        message: "Couldn't fetch NFTS",
        position: "topR",
      });
    };

    try {
      const response = await fetch(
        `/api/nfts?address=${address}&chain=${chainId}`
      );
      setIsLoading(false);

      if (response.status === 200) {
        const data = (await response.json()).result;

        // Only accept NFTs with valid metadata
        const validNfts: any[] = [];
        data.forEach((nft: any) => {
          if (nft.metadata) {
            const parsed = JSON.parse(nft.metadata);
            if (parsed.image) validNfts.push(nft);
          }
        });
        setNfts(validNfts);
      } else {
        onError();
      }
    } catch (err) {
      console.log(err);
      onError();
    }
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      <CustomAppBar
        onSelectChain={onSelectChain}
        onFetchRequested={doFetchNfts}
      />

      <Box
        sx={{
          marginTop: "40px",
          padding: "0 40px",
          paddingBottom: "40px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "20px" }}
        >
          Discovered NFTs
        </Typography>

        {!isLoading && nfts.length !== 0 && (
          <Grid
            container
            justifyContent="center"
            columnGap="30px"
            rowGap="30px"
          >
            {nfts.map((nft, index) => (
              <NFTCardWrapper
                key={index}
                nft={nft}
                onSelected={onNftSelected}
              />
            ))}
          </Grid>
        )}

        {isLoading && (
          <CircularProgress
            size="4rem"
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translateX(-50%) translateY(-50%)",
            }}
          />
        )}

        {!isLoading && nfts.length === 0 && (
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Nothing to show!
          </Typography>
        )}

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
          width="500px"
        >
          <NftCard chain={chain} moralisApiResult={selectedNft} />
        </Modal>
      </Box>
    </div>
  );
};

export default Index;
