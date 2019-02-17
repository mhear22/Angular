import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'moment'})
export class MomentFilter implements PipeTransform {
	transform(value) {
		//Implement
		return value;
	}
}