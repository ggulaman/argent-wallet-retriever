import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET) 400", () => {
    return request(app.getHttpServer())
      .get("/0x")
      .expect(400)
      .expect({ statusCode: 400, message: "Invalid Ethereum Address" });
  });

  it("/ (GET) 200", () => {
    return request(app.getHttpServer())
      .get("/0x1f747478aDc13c1D7488701817EfFDf3dC765EdD")
      .expect(200)
      .expect({
        address: "0x1f747478aDc13c1D7488701817EfFDf3dC765EdD",
        ethBalance: 0,
        numberOfGuardians: 0,
        ERC20Balances: [],
      });
  });
});
