import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	private readonly apiURL = "http://localhost:3000";

  constructor(private httpClient: HttpClient) {}

	login(user: User): Observable<User> {
		return this.httpClient.post<User>(`${this.apiURL}/login`, user);
	}

	register(user: User): Observable<User> {
		return this.httpClient.post<User>(`${this.apiURL}/register`, user);
	}

	userCanBeLogged(user: User): Observable<boolean> {
		//* Simulation of an asynchronous backend call which takes a bit of time.
		return of(
		user.username === "Pedro" 
		&& user.password === "1234")
		.pipe(delay(2000));
	}

	userCanBeRegistered(user: User): Observable<boolean> {
		//* Simulation of an asynchronous backend call which takes a bit of time.
		const requiredFieldsCondition =  
		user.username === "Pedro" 
		&& user.password === "1234" 
		&& user.passwordConfirm === user.password;
		const optionalFieldsCondition = user.email ? (user.email === "pedro@gmail.com") : true;

		return of(requiredFieldsCondition && optionalFieldsCondition).pipe(delay(2000));
	}
}
