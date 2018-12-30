import { Injectable } from "@angular/core";
import { MileageRecordingModel } from "./Api/Api";

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

export class GraphingCalculator {
	private Points:MileageRecordingModel[];
	
	constructor(private data:MileageRecordingModel[]) {
		this.Points = data.filter(x=> Number(x.Recording) > 0).sort(x=>x.Year);
		this.Points.reverse().push(data[0]);
		this.Points.reverse();
	}
	
	getNextPoint(element:MileageRecordingModel):MileageRecordingModel {
		var year = element.Year;
		var next = this.Points.filter(x=>x.Year > year)[0];
		return next;
	}
	getPreviousPoint(element:MileageRecordingModel):MileageRecordingModel {
		var year = element.Year;
		var filtered = this.Points.filter(x=>x.Year <= year);
		return filtered[filtered.length-1];
	}
	
	getExpectedValueForYear(year:MileageRecordingModel):number {
		var last = this.getPreviousPoint(year);
		var next = this.getNextPoint(year);
		
		var offset = Number(last.Recording) - Number(next.Recording);
		var yearOffset = last.Year - next.Year;
		
		var currentOffset = year.Year - last.Year
		
		var part = offset/yearOffset;
		
		return currentOffset * part + Number(last.Recording);
	}
}