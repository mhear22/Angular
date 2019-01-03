import { MileageRecordingModel } from "./Api/Api";

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
		if(next == null)
			return this.Points[this.Points.length - 1];
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
		if(isNaN(part)) {
			return Number(last.Recording);
		}
		
		return currentOffset * part + Number(last.Recording);
	}
}