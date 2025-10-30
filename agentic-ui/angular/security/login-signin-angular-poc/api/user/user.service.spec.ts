import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { User } from './user';

describe('UserService', () => {
  let userService: UserService;
  let httpTestController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    userService = TestBed.inject(UserService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  it('should register an user', () => {
    const mockUser: User = {
      username: "Pedro", 
      password: "1234",
      passwordConfirm: "1234",
      email: "pedro@gmail.com" 
    };
    
    userService.register(mockUser).subscribe(user => {
      expect(user).toEqual(mockUser)
    });

    const mockRequest = httpTestController.expectOne("http://localhost:3000/register");
    expect(mockRequest.request.method).toEqual('POST');
  });

  it('should login an user', () => {
    const mockUser: User = {
      username: "Pedro", 
      password: "1234"
    };
    
    userService.login(mockUser).subscribe(user => {
      expect(user).toEqual(mockUser)
    });

    const mockRequest = httpTestController.expectOne("http://localhost:3000/login");
    expect(mockRequest.request.method).toEqual('POST');
  });
});