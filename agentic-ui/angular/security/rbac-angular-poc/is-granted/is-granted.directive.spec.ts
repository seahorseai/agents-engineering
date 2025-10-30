import { TestBed } from '@angular/core/testing';
import { IsGrantedDirective } from './is-granted.directive'; 
import { RbacService } from '../rbac/rbac.service';
import { User } from '../types';
import { TemplateRef, ViewContainerRef } from '@angular/core';

describe('IsGrantedDirective', () => {
  let directive: IsGrantedDirective;
  let rbacService: RbacService;
  let templateRef: TemplateRef<any>;
  let viewContainer: ViewContainerRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        IsGrantedDirective,
        { provide: RbacService, useValue: jasmine.createSpyObj('RbacService', ['isGranted']) },
        { provide: TemplateRef, useValue: jasmine.createSpyObj('TemplateRef', ['createEmbeddedView']) },
        { provide: ViewContainerRef, useValue: jasmine.createSpyObj('ViewContainerRef', ['createEmbeddedView']) },
      ],
    });
    directive = TestBed.inject(IsGrantedDirective);
    rbacService = TestBed.inject(RbacService);
    templateRef = TestBed.inject(TemplateRef);
    viewContainer = TestBed.inject(ViewContainerRef);
  });

  it('should be created', () => {
    expect(directive).toBeTruthy();
  });
  
  it('should display the content when the user is authorized', () => {
    const user: User = {
      id: 1,
      name: 'User',
      role: {
        id: 3,
        name: 'Administrator',
        uid: 'ADMINISTRATOR',
        extends: 2
      }};
    const roleOrPermission = 'admin';
    directive.isGranted = roleOrPermission;
    directive.isGrantedFor = user;
    directive.ngOnInit();
  
    expect(rbacService.isGranted).toHaveBeenCalledWith(roleOrPermission, user);
  });

  it('should not display the content when the user is unauthorized', () => {
    const user: User = {
      id: 1,
      name: 'User',
      role: {
        id: 3,
        name: 'Administrator',
        uid: 'USER',
        extends: 2
      }};
    const roleOrPermission = 'admin';
    directive.isGranted = roleOrPermission;
    directive.isGrantedFor = user;
    directive.ngOnInit();
  
    expect(rbacService.isGranted).toHaveBeenCalledWith(roleOrPermission, user);
    expect(viewContainer.createEmbeddedView).not.toHaveBeenCalled();
  });
});