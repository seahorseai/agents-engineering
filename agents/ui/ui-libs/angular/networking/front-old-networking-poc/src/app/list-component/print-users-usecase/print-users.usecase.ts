import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { apiURL } from '../../url';

@Injectable({
  providedIn: 'root'
})
export class PrintUsersUseCase {

  constructor(protected httpClient: HttpClient) { }

  execute(): Observable<any> {
    return this.httpClient.get(`${apiURL}/users`).pipe(
      catchError(error => {
        console.error('Error fetching JSON data:', error);

        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }
}