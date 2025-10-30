import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { SignInRequest } from "./signin-request.dto";
import { UserEntity } from "./user.entity";


describe("User Entity", () => {
	it("should create a new instance without validation errors", async () => {
		const signInRequest = new SignInRequest();
		signInRequest.name = "Pepe";
		signInRequest.email = "pepe@email.com";
		signInRequest.password = "pepe1234";
		signInRequest.confirmPassword = "pepe1234";

		const newUser = plainToInstance(UserEntity, signInRequest);
		const userValidationErrors = await validate(newUser);
		expect(userValidationErrors.length).toBe(0);
	});
});