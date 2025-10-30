import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if (sessionStorage.getItem('user')) {
    return true;
  } else {
    router.navigateByUrl('login');
    return false;
  }
};
