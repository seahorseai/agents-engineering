import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  readonly apiURL: string = "https://jsonplaceholder.typicode.com/users";
  
  constructor(protected httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL);
  }
}