import { Component } from '@angular/core';
import { User } from './user.interface';
import { ListService } from './list.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

	users: Observable<User[]> = of([]);
  
  constructor(protected listService : ListService) {}

	loadUsers() {
		this.users = this.listService.getUsers();
	}
}