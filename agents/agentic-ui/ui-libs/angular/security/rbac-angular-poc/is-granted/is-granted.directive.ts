import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { RbacService } from '../rbac/rbac.service';
import { User } from '../types';

@Directive({
  selector: '[isGranted]',
  standalone: true
})
export class IsGrantedDirective implements OnInit {
  
  private _user!: User;
  private _roleOrPermission!: string;

  constructor(
    private _rbacService: RbacService, 
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef
  ) {}

  @Input()
  set isGranted(roleOrPermission: string) {
    this._roleOrPermission = roleOrPermission;
  }

  @Input('isGrantedFor')
  set isGrantedFor(user: User) {
    this._user = user;
  }

  ngOnInit() {
    if (this._rbacService.isGranted(this._roleOrPermission, this._user)) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    }
  }  
}