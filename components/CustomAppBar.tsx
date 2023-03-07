import { KeyboardArrowDownRounded } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Button,
  ChainSelector,
  CryptoLogos,
  Dropdown,
  Input,
  Modal,
  Tooltip,
} from "@web3uikit/core";
import { DappConfig } from "@web3uikit/core/dist/lib/ChainSelector/types";
import { useState } from "react";

const CustomAppBar = () => {
  const [currentChain, setCurrentChain] = useState<
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
    | "palm"
  >("ethereum");
  const [showChainModal, setShowChainModal] = useState(false);
  const [selectedChain, setSelectedChain] = useState<DappConfig[]>([
    {
      chainId: "0x1",
    },
  ]);

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
      chain: "Cronos",
      chainId: "0x19",
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
    {
      chain: "Cronos",
      chainId: "0x152",
      name: "Testnet",
      network: "testnet",
    },
  ];

  const chainIdsToNames = new Map<
    string,
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
    | "palm"
  >([
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
    setSelectedChain(values);
    setShowChainModal(false);
    setCurrentChain(chainIdsToNames.get(values[0].chainId)!);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "white",
        padding: "10px 40px",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <Toolbar sx={{ width: "100%" }}>
        <Stack direction="row" alignItems="center" sx={{ width: "100%" }}>
          <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
            NFT Explorer
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            sx={{ flexGrow: 1, gap: 2 }}
          >
            <Input label="" placeholder="Enter a valid wallet address here" />
            <Button text="Fetch NFTs" theme="outline" />
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
        isCentered
        hasFooter={false}
        isVisible={showChainModal}
        onCloseButtonPressed={() => setShowChainModal(false)}
        title={
          <Typography color="#68738D" variant="h5">
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
