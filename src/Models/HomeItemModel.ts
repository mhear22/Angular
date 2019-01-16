export class HomeItemModel {
	public Name:string="";
	public IconClass:string="";
	public RequiresLogin:boolean = true;
	public RequiresPlan:boolean = true;
	public Allowed:boolean = true;
	public Route?:string = null;
	public Action?:any = null;
	public Invert?:boolean = false;
	public Disabled?:boolean = false;
}