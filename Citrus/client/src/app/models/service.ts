export class Service {
	constructor(
		title: string,
		description: string,
		cost: number,
		duration: Date,
	) {
		this.title = title;
		this.description = description;
		this.cost = cost;
		this.duration = duration;
	}
	title: string;
	description: string;
	cost: number;
	duration: Date;
}
