import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'toFixed'})
export class ToFixedFilter implements PipeTransform {
	transform(value) {
		var fixed = Number(value).toFixed(2);
		return fixed;
	}
}