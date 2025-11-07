import { TestBed } from '@angular/core/testing';

import { RbacService } from './rbac.service';  

describe('RbacService', () => {
  let service: RbacService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RbacService]  
    });
    service = TestBed.inject(RbacService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check that you have a right of access', () => {
    const roles = [
      {
        id: 1,
        name: 'User',
        uid: 'USER',
        extends: null
      },
      {
        id: 2,
        name: 'Staff',
        uid: 'STAFF',
        extends: 1
      },
      {
        id: 3,
        name: 'Administrator',
        uid: 'ADMINISTRATOR',
        extends: 2
      }
    ];
    const user = 
    {
      id: 1,
      name: 'User',
      role: {
        id: 1,
        name: 'Administrator',
        uid: 'ADMINISTRATOR',
        extends: 2
      }
    }

    service.setRoles(roles);
    service.setAuthenticatedUser(user);

    expect(service.isGranted('user')).toBe(false);
    expect(service.isGranted('ADMINISTRATOR')).toBe(true);
  });
  
  it('should check for unauthorised access', () => {
    const roles =[
      {
        id: 1,
        name: 'User',
        uid: 'USER',
        extends: null
      }
    ];

    const user = 
    {
      id: 1,
      name: 'User',
      role: {
        id: 1,
        name: 'user',
        uid: 'USER',
        extends: null
      }
    }

    service.setRoles(roles);
    service.setAuthenticatedUser(user);

    expect(service.isGranted('STAFF')).toBe(false);
    expect(service.isGranted('ADMINISTRATOR')).toBe(false);
  });
});