import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsernameService {
  private takenUsernames = ['user1', 'admin', 'test'];

  checkUsername(username: string): Observable<boolean> {
    // Simulates a delayed API response
    return of(this.takenUsernames.includes(username)).pipe(delay(1000));
  }
}
