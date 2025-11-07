import { Component, OnInit } from '@angular/core';


import { UserResponse } from './print-users-usecase/user-response';
import { PrintUsersUseCase } from './print-users-usecase/print-users.usecase';


@Component({
  selector: 'list-component',
  standalone: true,
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  users: UserResponse[] = [];
  
  constructor(protected printUsersUseCase : PrintUsersUseCase) {}

  ngOnInit() {

    this.printUsersUseCase.execute().subscribe(
      {next: res => this.users = res,
       complete: () => {},
       error: () => {}
      });
  }



}