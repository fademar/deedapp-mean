import { Component, OnInit, ViewChild } from '@angular/core';
import { DeedService } from '../../services/deed.service';
import * as _ from 'underscore';
import { PagerService } from '../../services/pager.service';

import {DataSource} from '@angular/cdk/collections';
import {MdPaginator} from '@angular/material';
import {MdSort} from '@angular/material';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


@Component({
	selector: 'app-deeds',
	templateUrl: './deeds.component.html',
	styleUrls: ['./deeds.component.css']
})

export class DeedsComponent implements OnInit {
	deeds;
	length;

	// pager object
 	pager: any = {};
 	
	// paged items
    pagedDeeds: any[];

	dataSource: MyDataSource | null;
	dataList = new DataList(this.deedService);

	displayedColumns = ['deedCode','deedRef','deedDate','deedName','complete','details'];

	constructor(private deedService: DeedService, private pagerService: PagerService) { }

	@ViewChild(MdPaginator) paginator: MdPaginator;
	@ViewChild(MdSort) sort: MdSort;
	
	ngOnInit() {
		this.deedService.getDeeds().subscribe(deeds => {
			this.deeds = deeds;
			console.log(this.deeds);
			this.length = deeds.length;
			this.setPage(1);
		})
		this.dataSource = new MyDataSource(this.dataList, this.paginator, this.sort);
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

export interface DeedData {
	id: string;
	deedCode: string;
	deedRef: string;
	deedDate: string;
	deedName: string;
	complete: boolean;
}

export class DataList {
	dataChange: BehaviorSubject<DeedData[]> = new BehaviorSubject<DeedData[]>([]);
	get data(): DeedData[] { return this.dataChange.value; }

	constructor(private deedService: DeedService) {
		this.deedService.getDeeds().subscribe(deeds => {
			this.dataChange.next(deeds)		
		});
	}
}

export class MyDataSource extends DataSource<any> {
	
	  constructor(private _dataList: DataList, private _paginator: MdPaginator, private _sort: MdSort) {
		super();
	  }
	
	  connect(): Observable<DeedData[]> {
		const displayDataChanges = [
		  this._dataList.dataChange,
		  this._paginator.page,
		  this._sort.mdSortChange,		  
		];
	
		return Observable.merge(...displayDataChanges).map(() => {
		  const sortedData = this.getSortedData();
	
		  // Grab the page's slice of data.
		  const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
		  return sortedData.splice(startIndex, this._paginator.pageSize);
		});
	  }
	
	  disconnect (  ): void {
	
	  }

	  	/** Returns a sorted copy of the database data. */
		getSortedData(): DeedData[] {
			const data = this._dataList.data.slice();
			if (!this._sort.active || this._sort.direction == '') { return data; }

			return data.sort((a, b) => {
			let propertyA: number|string = '';
			let propertyB: number|string = '';

			switch (this._sort.active) {
				case 'deedCode': [propertyA, propertyB] = [a.deedCode, b.deedCode]; break;
				case 'deedRef': [propertyA, propertyB] = [a.deedRef, b.deedRef]; break;
				case 'deedDate': [propertyA, propertyB] = [a.deedDate, b.deedDate]; break;
				case 'deedName': [propertyA, propertyB] = [a.deedName, b.deedName]; break;
			}

			let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
			let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

			return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
			});
		}
	
}
