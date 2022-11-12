import { Test, TestingModule } from "@nestjs/testing";
import { HttpException } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const INFURA_PROVIDER_URL = "https://mainnet.infura.io/v3/xxxx";
const MORALIS_API_KEY = "xxxxx";
const WALLET_PRIVATE_KEY = "xxxxxxxxx";
const MANAGE_GUARDIANS_SC_ADDRESS = "xxxxxx";
const MANAGE_GUARDIANS_SC_ABI='[]'
const expectedBalance = 1;
const expectedNumberOfGuardians = 5;
const PUBLIC_URL="";
const NODE_ENV="test";


jest.mock("moralis", () => {
  return {
    default: {
      start: jest.fn(() => null),
      EvmApi: {
        token: {
          getWalletTokenBalances: jest.fn(() => {
            return { result: [] };
          }),
        },
      },
    },
    start: jest.fn(() => null),
  };
});

jest.mock("@moralisweb3/evm-utils", () => {
  const original = jest.requireActual("@moralisweb3/evm-utils");
  return {
    ...original,
    EvmChain: {
      ETHEREUM: "ETHEREUM",
    },
  };
});

jest.mock("ethers", () => {
  const original = jest.requireActual("ethers");
  const BigNumber = original.BigNumber;
  return {
    ...original,
    ethers: {
      providers: {
        JsonRpcProvider: jest.fn().mockImplementation(() => {
          return {
            getBalance: jest.fn(() => BigNumber.from(`${expectedBalance}`)),
          };
        }),
      },
      utils: {
        isAddress: original.ethers.utils.isAddress,
        formatEther: jest.fn(() => `${expectedBalance}`),
      },
      Wallet: jest.fn().mockImplementation(() => {
        return {};
      }),
      Contract: jest.fn().mockImplementation(() => {
        return {
          guardianCount: jest.fn(() => {
            return {
              toString: jest.fn(() => `${expectedNumberOfGuardians}`),
            };
          }),
        };
      }),
    },
  };
});

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    jest.resetModules();
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    process.env = {
      INFURA_PROVIDER_URL,
      MORALIS_API_KEY,
      WALLET_PRIVATE_KEY,
      MANAGE_GUARDIANS_SC_ADDRESS,
      MANAGE_GUARDIANS_SC_ABI,
      NODE_ENV,
      PUBLIC_URL
    };
  });

  it('should return "Hello World!"', () => {
    const address = "0x";
    expect(() => appController.getWalletDetails(address)).toThrow(
      HttpException,
    );
  });

  it("asdf", async () => {
    const address = "0xc0ffee254729296a45a3885639AC7E10F9d54979";
    const response = await appController.getWalletDetails(address);
    expect(response).toStrictEqual({
      ERC20Balances: [],
      address,
      ethBalance: expectedBalance,
      numberOfGuardians: expectedNumberOfGuardians,
    });
  });
});
