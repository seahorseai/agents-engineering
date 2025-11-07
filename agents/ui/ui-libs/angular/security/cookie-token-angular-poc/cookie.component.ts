import { Component, inject, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './cookie.component.html',
	imports: [ReactiveFormsModule],
})
export class CookieComponent implements OnInit {
	cookieService = inject(CookieService);
	router = inject(Router);
	cookieInput = new FormControl('');

	ngOnInit(): void {
		this.cookieService.set('X-Auth-Token', '');
    this.cookieService.set('X2-Auth-Token', '');
	}

	setCookie() {
		this.cookieService.set('X-Auth-Token', this.cookieInput.value ?? '');
	}

  setCookie2() {
		this.cookieService.set('X2-Auth-Token', this.cookieInput.value ?? '');
	}
}
