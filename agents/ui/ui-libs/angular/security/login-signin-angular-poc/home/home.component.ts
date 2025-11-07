import { Component } from '@angular/core';
import { User } from '../api/user/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

	user: User | null;

	constructor() {
		let data = sessionStorage.getItem("user");
		this.user = data ? JSON.parse(data) as User : null;
	}
}
