import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieComponent } from './cookie.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

describe('CookieComponent', () => {
  let component: CookieComponent;
  let fixture: ComponentFixture<CookieComponent>;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule], 
      providers: [CookieService, Router] 
    }).compileComponents();

    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set cookies', () => {
    const tokenValue = 'testToken';
    component.cookieInput.setValue(tokenValue);
    component.setCookie();
    expect(cookieService.get('X-Auth-Token')).toEqual(tokenValue);
    const tokenValue2 = 'testToken2';
    component.cookieInput.setValue(tokenValue2);
    component.setCookie2();
    expect(cookieService.get('X2-Auth-Token')).toEqual(tokenValue2);
  });

  it('should delete X-Auth-Token cookie', () => {
    component.cookieService.set('X-Auth-Token', 'test');
    component.cookieService.set('X2-Auth-Token', 'test');
    component.cookieService.delete('X-Auth-Token');
    expect(cookieService.check('X-Auth-Token')).toBeFalsy();
    expect(cookieService.check('X2-Auth-Token')).toBeTruthy();
  });

  it('should delete all cookies', () => {
    cookieService.set('X-Auth-Token', 'test');
    cookieService.set('X2-Auth-Token', 'test');
    component.cookieService.deleteAll();
    expect(cookieService.check('X-Auth-Token')).toBeFalsy();
    expect(cookieService.check('X2-Auth-Token')).toBeFalsy();
  });

});