import { Component, OnInit } from '@angular/core';
import { WheelModel } from 'src/Models/WheelModel';

@Component({
	selector: 'fitment',
	templateUrl: './fitment.html'
})
export class Fitment implements OnInit {
	ngOnInit(): void {
		this.wheelModel = { StudCount: "5", StudDiameter:"100" }
	}
	public wheelModel:WheelModel = { StudCount: "5", StudDiameter: "100"};
	constructor() { }
	
	Items() {
		var count = Number(this.wheelModel.StudCount)
		return Array.apply(null, {length:count}).map(Function.call, Number)
	}
	
	PCDStyle(Count) {
		var fraction = (360/Number(this.wheelModel.StudCount));
		var degrees = fraction * Count;
		
		return {
			"transform":"rotate(" + degrees + "deg)" 
		};
	}
}