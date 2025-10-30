import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;
  let appService: AppService;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });
  it("should be defined", () => {
    expect(appController).toBeDefined();
  });

  describe("getHello", () => {
    it('should return "Hello World!"', async () => {
      const result = "Hello World!";
      jest.spyOn(appService, 'getHello').mockResolvedValue(result);
      expect(await appController.getHello()).toBe(result);
     });
  });
});