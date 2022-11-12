import { WalletDTO } from "./app.dto";

describe("WalletDTO", () => {
  it("should be defined", () => {
    expect(new WalletDTO()).toBeDefined();
  });
});
