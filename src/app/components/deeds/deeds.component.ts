import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';

@Component({
	selector: 'app-deeds',
	templateUrl: './deeds.component.html',
	styleUrls: ['./deeds.component.css']
})
export class DeedsComponent implements OnInit {
	deeds;
	constructor(private deedService:DeedService) { }

	ngOnInit() {
		this.deedService.getDeeds().subscribe(deeds => {
			this.deeds = deeds;
		})
	}

}
