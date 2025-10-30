import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from './car.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarListService {

	apiUrl: string = 'https://d7171d6c-b25c-4812-9bc9-8276d5cf00e3.mock.pstmn.io';

  constructor(private httpClient: HttpClient) { }

	getCars(): Observable<Car[]> {
 		return this.httpClient.get<Car[]>(`${this.apiUrl}/cars`);
	}
}