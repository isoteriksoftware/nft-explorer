import Moralis from "moralis";

export const initMoralis = async () => {
  if (Moralis.Core.isStarted) return;

  await Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });
};
