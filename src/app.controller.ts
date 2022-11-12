import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { ethers } from "ethers";
import { AppService } from "./app.service";
import { WalletDTO } from "./app.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":ADDRESS")
  getWalletDetails(@Param("ADDRESS") address: string): Promise<WalletDTO> {
    if (!ethers.utils.isAddress(address))
      throw new HttpException(
        "Invalid Ethereum Address",
        HttpStatus.BAD_REQUEST,
      );
    return this.appService.getWalletDetails(address);
  }
}
