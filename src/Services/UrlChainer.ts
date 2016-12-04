export class UrlChainer {
	private base:string = "";
	private args:string[] = [];
	
	constructor(url: string) {
		this.base = url;
	}
	
	public Q(Name: string, Value: string):UrlChainer {
		this.args.push(Name + "=" + Value);
		return this;
	}
	
	public FromModel(query:any):UrlChainer {
		for (var item in query) {
			if (!query.hasOwnProperty(item)) continue;
			this.args.push(item + "=" + query[item]);
		}
		return this;
	} 
	
	public GetUrl():string{
		var argumentString:string = "";
		var first = true;
		this.args.forEach(element => {
			argumentString += (first)?"?":"&";
			argumentString += element;
			first = false;
		});
		
		return this.base + argumentString;
	}
}