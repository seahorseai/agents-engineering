import { Component, OnDestroy } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl, Validators, AbstractControlOptions, FormControlStatus } from '@angular/forms';
import { UserService } from '../api/user/user.service';
import { passwordValidator } from './password-validator';
import { Observable, Subject, Subscription, filter, startWith, switchMap, take } from 'rxjs';
import { BackendRegisterValidator } from './backend-reg-validation.validator';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		NgClass,
		ReactiveFormsModule,
		RouterLink,
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
	protected form: FormGroup;
	protected formSubmitSubject$: Subject<any>;
	protected submitted: boolean = false;
	protected formStatusObservable$: Observable<FormControlStatus>;
	protected formStatusSubscription: Subscription;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private userService: UserService,
		private backendRegisterValidator: BackendRegisterValidator
	) {
		this.form = this.formBuilder.group({
			username: ['', Validators.required],
			email: ['', [Validators.email]],
			password: ['', Validators.required],
			passwordConfirm: ['', Validators.required],
		}, {
			validators: passwordValidator,
			asyncValidators: backendRegisterValidator.validate.bind(this),
			updateOn: 'submit'
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
				this.registerUser();
			}
		);
	}

	protected get control(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}

	registerUser(): void {
		this.userService
			.register({
				username: this.form.value['username'],
				email: this.form.value['email'] ?? "pedro@gmail.com",
				password: this.form.value['password'],
				passwordConfirm: this.form.value['passwordConfirm']
			})
			.subscribe({
				complete: () => {
					this.router.navigateByUrl('/login');
				}
			});
	}

	ngOnDestroy(): void {
		this.formStatusSubscription.unsubscribe();
	}
}
