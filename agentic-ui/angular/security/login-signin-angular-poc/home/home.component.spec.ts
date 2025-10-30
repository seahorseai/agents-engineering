import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { User } from '../api/user/user';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('HomeComponent', () => {
  let homeComponent: HomeComponent;
  let componentFixture: ComponentFixture<HomeComponent>;
  let mockUser: User;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    componentFixture = TestBed.createComponent(HomeComponent);
    homeComponent = componentFixture.componentInstance;
    debugElement = componentFixture.debugElement;
  });

  it('should create', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('should initialize user as null when sessionStorage is empty', () => {
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    componentFixture.detectChanges();

    expect(homeComponent.user).toBeNull();
  });

  it('should display login message when user is null', () => {
    homeComponent.user = null;
    componentFixture.detectChanges();
  
    const loginMessage = debugElement.query(By.css('p'));
  
    expect(loginMessage.nativeElement.textContent).toContain('Log in!');
  });

  it('should display welcome message and user', () => {
    mockUser = {
      id: '1',
      username: 'Pedro',
      email: 'pedro@gmail.com',
      password: '1234'
    };

    homeComponent.user = mockUser;
    componentFixture.detectChanges();

    const welcomeMessage = debugElement.query(By.css('p'));
    const userDataList = debugElement.queryAll(By.css('li'));

    expect(welcomeMessage.nativeElement.textContent).toContain(`Welcome, ${mockUser.username}!`);
    expect(userDataList[0].nativeElement.textContent).toContain(`Email: ${mockUser.email}`);
    expect(userDataList[1].nativeElement.textContent).toContain(`Id: ${mockUser.id}`);
  });
});