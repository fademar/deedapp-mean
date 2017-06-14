import { Component, OnInit } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import * as _ from 'underscore';
import { PagerService } from '../../services/pager.service';

@Component({
	selector: 'app-deeds',
	templateUrl: './deeds.component.html',
	styleUrls: ['./deeds.component.css']
})
export class DeedsComponent implements OnInit {
	deeds;


	// pager object
 	pager: any = {};
 	
	// paged items
    pagedDeeds: any[];

	constructor(private deedService: DeedService, private pagerService: PagerService) { }

	ngOnInit() {
		this.deedService.getDeeds().subscribe(deeds => {
			this.deeds = deeds;
			this.setPage(1);
		})
	}

	setPage(page: number) {
		if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.deeds.length, page);
 
        // get current page of items
        this.pagedDeeds = this.deeds.slice(this.pager.startIndex, this.pager.endIndex + 1);
	}

}
