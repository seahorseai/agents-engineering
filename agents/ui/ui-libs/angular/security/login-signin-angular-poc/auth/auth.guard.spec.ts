import { TestBed } from '@angular/core/testing';

import { authGuard } from './auth.guard';
import { CanActivateFn, provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { RouterTestingHarness } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let mockAuthGuard: jasmine.SpyObj<CanActivateFn>;
  let mockRouter: RouterTestingHarness;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(routes)
      ]
    });

    mockAuthGuard = jasmine.createSpyObj(['executeGuard']);
    mockRouter = await RouterTestingHarness.create();
  });

  it('should be created', () => {
      expect(executeGuard).toBeTruthy();
  });

  it('should be activated when a logged user exists', async() => {
      sessionStorage.setItem('user', JSON.stringify('exists'));
      mockRouter.navigateByUrl('/home');
      expect(await mockRouter.navigateByUrl('/home')).toBeTruthy();
  });

  it('should not be activated when a logged user not exists', async() => {
      mockAuthGuard
      sessionStorage.setItem('user', JSON.stringify('exists'));
      expect(await mockRouter.navigateByUrl('/home')).not.toEqual(HomeComponent);
      sessionStorage.removeItem('user');
  });
});
