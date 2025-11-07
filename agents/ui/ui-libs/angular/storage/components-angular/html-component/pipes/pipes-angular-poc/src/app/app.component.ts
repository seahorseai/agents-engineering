import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
	template: `
		<h1>Angular Pipes</h1>
		<p>Upper case text: {{ lowerCaseText | uppercase }}</p>
		<p>Lower case text: {{ upperCaseText | lowercase }}</p>
		<p>Title case text: {{ upperCaseTextTwo | titlecase }}</p>
	`,
})
export class AppComponent {
	lowerCaseText: string = 'i used to be lower case';
	upperCaseText: string = 'I USED TO BE UPPER CASE';
	upperCaseTextTwo: string = 'I USED TO BE UPPER CASE TOO';
}