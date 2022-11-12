import { Injectable } from "@nestjs/common";
import { ethers, BigNumber } from "ethers";
import * as dotenv from "dotenv";
import Moralis from "moralis";
import { EvmChain, Erc20Value } from "@moralisweb3/evm-utils";
import { WalletDTO } from "./app.dto";

dotenv.config();

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

const getBalance = async (
  provider: ethers.providers.JsonRpcProvider,
  ethAddress: string,
): Promise<number> => {
  const ethBalance: BigNumber = await provider.getBalance(ethAddress);
  const ethBalanceFormated = Number(ethers.utils.formatEther(ethBalance));
  return ethBalanceFormated;
};

const getNumberOfArgetGuardians = async (
  provider: ethers.providers.JsonRpcProvider,
  ethAddress: string,
): Promise<number> => {
  const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
  const guardianManager = new ethers.Contract(
    process.env.MANAGE_GUARDIANS_SC_ADDRESS,
    JSON.parse(process.env.MANAGE_GUARDIANS_SC_ABI),
    signer,
  );

  const numberOfGuardians = await guardianManager.guardianCount(ethAddress);

  return Number(numberOfGuardians.toString());
};

const getERC20BalancesOf = async (
  ethAddress: string,
): Promise<Erc20Value[]> => {
  const chain = EvmChain.ETHEREUM;
  const response = await Moralis.EvmApi.token.getWalletTokenBalances({
    address: ethAddress,
    chain,
  });

  return response.result;
};

@Injectable()
export class AppService {
  public provider = new ethers.providers.JsonRpcProvider(
    process.env.INFURA_PROVIDER_URL,
  );

  async getWalletDetails(ethAddress: string): Promise<WalletDTO> {
    const ethBalance: number = await getBalance(this.provider, ethAddress);
    const numberOfArgentGuardians: number = await getNumberOfArgetGuardians(
      this.provider,
      ethAddress,
    );
    const ERC20Balances = await getERC20BalancesOf(ethAddress);

    const walletDetails: WalletDTO = {
      address: ethAddress,
      ethBalance,
      numberOfGuardians: numberOfArgentGuardians,
      ERC20Balances,
    };

    return walletDetails;
  }
}
