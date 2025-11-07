import { Component } from '@angular/core';
import { Car } from './car.interface';
import { CarListService } from './car-list.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
	carList: Car[] = [];

	constructor(private carListService: CarListService) {
		
	}

	ngOnInit() {
		this.carListService.getCars().subscribe(cars => this.carList = cars);
	}
}