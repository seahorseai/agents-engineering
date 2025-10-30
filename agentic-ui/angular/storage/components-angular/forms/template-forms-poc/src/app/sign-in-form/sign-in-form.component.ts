import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './sign-in-form.component.html',
  styleUrl: './sign-in-form.component.css'
})
export class SignInFormComponent {
	username: string;
	password: string;

	constructor() {
		this.username = '';
		this.password = '';
	}

	onSubmit() {
		console.log(this.username, this.password);
	}
}