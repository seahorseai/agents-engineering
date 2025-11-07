import { Component, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl, Validators, AbstractControlOptions, FormControlStatus } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../api/user/user.service';
import { BackendLoginValidator } from './backend-login-validation.validator';
import { Observable, Subject, Subscription, filter, startWith, switchMap, take } from 'rxjs';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		NgClass,
		RouterLink,
		ReactiveFormsModule,
	],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
	protected form: FormGroup;
	protected formSubmitSubject$: Subject<any>;
	protected submitted: boolean = false;
	protected formStatusObservable$: Observable<FormControlStatus>;
	protected formStatusSubscription: Subscription;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private backendLoginValidator: BackendLoginValidator
	) {
			this.form = this.formBuilder.group({
				username: ['', [Validators.required]],
				password: ['', [Validators.required]],
			}, {
				asyncValidators: backendLoginValidator.validate.bind(this),
				updateOn: "submit"
			} as AbstractControlOptions);

			this.formSubmitSubject$ = new Subject();

			this.formStatusObservable$ = this.formSubmitSubject$
				.pipe(
					switchMap((value, index) =>
						this.form.statusChanges.pipe(
							startWith(this.form.status),
							filter(status => status === 'VALID' || status === 'INVALID'),
							take(1)
						)
					),
				);

			this.formStatusSubscription = this.formStatusObservable$.subscribe((status) => {
				this.submitted = true;
				if (status === 'VALID')
					this.logUser();
			}
			);
	}


	protected get control(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}

	logUser(): void {
		this.userService
			.login({
				username: this.form.value['username'],
				password: this.form.value['password'],
			})
			.subscribe({
				next: (data) => {
					sessionStorage.setItem('user', JSON.stringify(data));
				},
				complete: () => {
					this.router.navigateByUrl('/home');
				},
			});
	}
	
	ngOnDestroy(): void {
		this.formStatusSubscription.unsubscribe();
	}
}
