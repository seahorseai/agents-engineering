import { Component, OnInit } from '@angular/core';
import { User } from './user.interface';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  users: User[] = [];
  
  constructor(protected listService : ListService) {}

  ngOnInit() {
    this.listService.getUsers().subscribe(
      {next: res => this.users = res,
       complete: () => {},
       error: () => {}
      });
  }
}