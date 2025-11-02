import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("Hello World!");
      }, 2000);
    });
  }
}