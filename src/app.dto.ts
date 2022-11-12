import "reflect-metadata";
import {
  IsNumber,
  IsString,
  IsEthereumAddress,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";
import { Erc20Value } from "@moralisweb3/evm-utils";

export class WalletDTO {
  @IsEthereumAddress()
  address: string;

  @IsString()
  ethBalance: number;

  @IsNumber()
  numberOfGuardians: number;

  @IsArray()
  @Type(() => Erc20Value)
  ERC20Balances: Erc20Value[];
}
