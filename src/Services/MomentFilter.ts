import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";


@Pipe({name:'moment'})
export class MomentFilter implements PipeTransform {
	transform(value) {
		var result = moment(value);
		
		return result.fromNow();
	}
}