import { http, createStorage, cookieStorage } from "wagmi";
import { sepolia, bscTestnet, blastSepolia, mainnet } from "wagmi/chains";
import { Chain, getDefaultConfig } from "@rainbow-me/rainbowkit";

const projectId = "9ea554f53eda77fd4dcb2ba5fa72e0b0";

const supportedChains: Chain[] = [mainnet, sepolia, bscTestnet, blastSepolia];

export const config = getDefaultConfig({
  appName: "WalletConnection",
  projectId,
  chains: supportedChains as any,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: supportedChains.reduce(
    (obj, chain) => ({ ...obj, [chain.id]: http() }),
    {}
  ),
});
