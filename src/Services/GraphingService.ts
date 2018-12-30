import { Injectable } from "@angular/core";
import { MileageRecordingModel } from "./Api/Api";
import { GraphingCalculator } from "./GraphingCalculator";

@Injectable()
export class GraphingService {
	constructor() { }
	
	public BestFitPointsToGraph(data:MileageRecordingModel[]) {
		var calc = new GraphingCalculator(data);
		
		var firstYear = data[0].Year;
		var result = {
			name:"Car",
			series:[]
		};
		
		var lastdate = { name:firstYear+"", value:0};
		data.forEach(element => {
			
			var outcome = {
				name:element.Year+"",
				value:Number(element.Recording)
			}
			
			if(outcome.value == 0)
				outcome.value = calc.getExpectedValueForYear(element);
			
			result.series.push(outcome);
			lastdate = outcome;
		});
		return result;
	}
}

