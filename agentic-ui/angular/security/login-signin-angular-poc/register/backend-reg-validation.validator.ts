import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { UserService } from "../api/user/user.service";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class BackendRegisterValidator implements AsyncValidator {

	constructor(private userService: UserService) {

	}

	validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
		const userName = control.get("username")?.value as string;
		const userEmail = control.get("email")?.value as string | undefined;
		const userPassword = control.get("password")?.value as string;
		const confirmedPassword = control.get("passwordConfirm")?.value as string;
		return this.userService.userCanBeRegistered({
			username: userName,
			password: userPassword,
			email: userEmail,
			passwordConfirm: confirmedPassword
		})
		.pipe(
			map((canBeRegistered) => canBeRegistered ? null : { wrongCredentials: true })
		);
	}
}