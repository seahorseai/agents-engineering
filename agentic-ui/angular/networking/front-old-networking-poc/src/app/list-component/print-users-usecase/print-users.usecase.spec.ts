import { TestBed } from '@angular/core/testing';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserResponse } from './user-response';
import { PrintUsersUseCase } from './print-users.usecase';
import { apiURL } from '../../url';

describe('ListService', () => {
  	let printUsersUseCase: PrintUsersUseCase;
	let httpClient: HttpClient;

  	beforeEach(() => {
    	TestBed.configureTestingModule({
			imports: [HttpClientModule]
		});
    	printUsersUseCase= TestBed.inject(PrintUsersUseCase);
		httpClient = TestBed.inject(HttpClient);
  	});

  	it('should be created', () => {
    	expect(printUsersUseCase).toBeTruthy();
  	});

	it('should retrieve every user(httpClient)', (done) => {
		let retrievedData: UserResponse[] = [];
	
		httpClient.get<UserResponse[]>(`${apiURL}/users`).subscribe(data => {
			retrievedData = data;
			expect(retrievedData.length).toBeGreaterThan(0); 
			expect(retrievedData).toEqual(data);
			done();
		});
	});

	it('should retrieve every user (getAllUsers)', (done) => {
		let retrievedData: UserResponse[] = [];

		printUsersUseCase.execute().subscribe(data => {
			retrievedData = data;
			expect(retrievedData.length).toBeGreaterThan(0);
			expect(retrievedData).toEqual(data);
			done();
		});
	});
});