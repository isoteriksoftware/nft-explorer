import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import {
  Button,
  ChainSelector,
  CryptoLogos,
  Input,
  Modal,
  Tooltip,
  useNotification,
} from "@web3uikit/core";
import { DappConfig } from "@web3uikit/core/dist/lib/ChainSelector/types";
import { ChangeEvent, useState } from "react";
import WAValidator from "multicoin-address-validator";

export type Chain =
  | "polygon"
  | "ethereum"
  | "arbitrum"
  | "fantom"
  | "avalanche"
  | "binance"
  | "cronos"
  | "coinbase"
  | "ronin"
  | "optimism"
  | "aptos"
  | "palm";

interface CustomAppBarProps {
  onSelectChain: (chainId: string, chainName: Chain) => void;
  onFetchRequested: (address: string, chainId: string) => void;
}
const CustomAppBar = ({
  onSelectChain,
  onFetchRequested,
}: CustomAppBarProps) => {
  const [currentChain, setCurrentChain] = useState<Chain>("ethereum");
  const [showChainModal, setShowChainModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<DappConfig[]>([
    {
      chainId: "0x1",
    },
  ]);
  const [address, setAddress] = useState<string>("");
  const [chainSymbol, setChainSymbol] = useState("ETH");
  const [chainId, setChainId] = useState("0x1");
  const dispatchNotification = useNotification();

  const chainProviders = [
    {
      chain: "Eth",
      chainId: "0x1",
      name: "Mainnet",
      network: "mainnet",
    },
    {
      chain: "Polygon",
      chainId: "0x89",
      name: "Mainnet",
      network: "mainnet",
    },
    {
      chain: "Bsc",
      chainId: "0x38",
      name: "Mainnet",
      network: "mainnet",
    },
    {
      chain: "Fantom",
      chainId: "0xfa",
      name: "Mainnet",
      network: "mainnet",
    },
    {
      chain: "Eth",
      chainId: "0x3",
      name: "Ropsten",
      network: "testnet",
    },
    {
      chain: "Eth",
      chainId: "0x5",
      name: "Goerli",
      network: "testnet",
    },
    {
      chain: "Eth",
      chainId: "0x2a",
      name: "Kovan",
      network: "testnet",
    },
    {
      chain: "Polygon",
      chainId: "0x13881",
      name: "Mumbai",
      network: "testnet",
    },
    {
      chain: "Bsc",
      chainId: "0x61",
      name: "Testnet",
      network: "testnet",
    },
    {
      chain: "Eth",
      chainId: "0x4",
      name: "Rinkeby",
      network: "testnet",
    },
  ];

  const chainIdsToNames = new Map<string, Chain>([
    ["0x89", "polygon"],
    ["0x13881", "polygon"],
    ["0x1", "ethereum"],
    ["0x4", "ethereum"],
    ["0x2a", "ethereum"],
    ["0x5", "ethereum"],
    ["0x3", "ethereum"],
    ["0x152", "cronos"],
    ["0x61", "binance"],
    ["0x38", "binance"],
    ["0xfa", "fantom"],
  ]);

  const onChainChanged = (values: DappConfig[]) => {
    const chainId = values[0].chainId;
    const chainName = chainIdsToNames.get(chainId)!;
    let chainSymbol = "ETH";

    switch (chainName) {
      case "polygon":
        chainSymbol = "MATIC";
        break;
      case "ethereum":
        chainSymbol = "ETH";
        break;
      case "cronos":
        chainSymbol = "CRO";
        break;
      case "binance":
        chainSymbol = "BNB";
        break;
      case "fantom":
        chainSymbol = "ETH";
        break;
    }

    setChainId(chainId);
    setSelectedChain(values);
    setShowChainModal(false);
    setCurrentChain(chainName);
    setChainSymbol(chainSymbol);

    onSelectChain(chainId, chainName);

    onFetch(chainId);
  };

  const onAddressChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const onFetch = (chainId: string) => {
    if (!address) {
      dispatchNotification({
        type: "error",
        title: "Oops!",
        message: "Please enter a wallet address",
        position: "topR",
      });
      return;
    }

    if (!WAValidator.validate(address, chainSymbol)) {
      dispatchNotification({
        type: "error",
        title: "Oops!",
        message: `Please enter a valid ${currentChain} wallet address`,
        position: "topR",
      });
      return;
    }

    onFetchRequested(address, chainId);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "white",
        padding: { xs: "10px 10px", sm: "10px 20px", md: "10px 40px" },
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <Toolbar sx={{ width: "100%" }}>
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          alignItems="center"
          sx={{ width: "100%" }}
          rowGap="20px"
        >
          <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
            NFT Explorer
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            sx={{ flexGrow: 1, gap: 2 }}
          >
            <Input
              label=""
              placeholder="Enter a valid wallet address here"
              onChange={onAddressChanged}
            />
            <Button
              text="Fetch"
              theme="outline"
              onClick={() => onFetch(chainId)}
            />
          </Stack>

          <Tooltip content="Choose Blockchain" position="bottom">
            <IconButton onClick={() => setShowChainModal(true)}>
              <CryptoLogos chain={currentChain} size="48px" />
              <KeyboardArrowDownRounded color="primary" fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>

      <Modal
        hasFooter={false}
        isVisible={showChainModal}
        onCloseButtonPressed={() => setShowChainModal(false)}
        title={
          <Typography
            color="#68738D"
            variant="h4"
            sx={{
              fontSize: { xs: "1.1rem", sm: "2rem" },
            }}
          >
            Choose Blockchain
          </Typography>
        }
      >
        <div style={{ paddingBottom: "20px" }}>
          <ChainSelector
            IsMultipleAllowed={false}
            isCompatibilityChecked={false}
            providers={chainProviders}
            setValue={onChainChanged}
            values={selectedChain}
          />
        </div>
      </Modal>
    </AppBar>
  );
};

export default CustomAppBar;
