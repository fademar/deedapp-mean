import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';
import { MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

import { DeedService } from '../../services/deed.service';
import { PagerService } from '../../services/pager.service';
import { DownloadService } from '../../services/download.service';
import { AuthService } from '../../services/auth.service';


@Component({
	selector: 'app-deeds',
	templateUrl: './deeds.component.html',
	styleUrls: ['./deeds.component.css']
})

export class DeedsComponent implements OnInit {
	deeds;
	length;
	downloadUri;
	downloadName;

	// pager object
	pager: any = {};

	// paged items
	pagedDeeds: any[];

	dataSource: MyDataSource | null;
	dataList = new DataList(this.deedService);


	displayedColumns = ['deedCode', 'deedRef', 'deedDate', 'deedName', 'complete', 'details'];

	constructor(private titleService: Title, private deedService: DeedService, private pagerService: PagerService, private sanitizer: DomSanitizer, public auth: AuthService) { }

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngOnInit() {
		this.titleService.setTitle('LIST - Russian Deeds App');
		this.deedService.getDeeds().subscribe(deeds => {
			this.deeds = deeds;
			this.length = deeds.length;
			this.setPage(1);

			// Download Button Function
			let json = JSON.stringify(this.deeds);
			this.downloadUri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));

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

	updateDate() {
		let date = new Date;
		let month = date.getMonth() + 1;
		this.downloadName = date.getDate() + '-' + month + '-' + date.getFullYear() + '_' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds() + '.json';
	}

}

export interface DeedData {
	id: string;
	deedCode: string;
	deedRef: string;
	deedDate: any;
	deedName: string;
	complete: boolean;
}

export class DataList {
	dataChange: BehaviorSubject<DeedData[]> = new BehaviorSubject<DeedData[]>([]);
	get data(): DeedData[] { 
		return this.dataChange.value; 
	}
	
	constructor(private deedService: DeedService) {
		this.deedService.getDeeds().subscribe(deeds => {
			this.dataChange.next(deeds)
		});
	}
}

export class MyDataSource extends DataSource<any> {

	constructor(private _dataList: DataList, private _paginator: MatPaginator, private _sort: MatSort) {
		super();
	}

	connect(): Observable<DeedData[]> {
		const displayDataChanges = [
			this._dataList.dataChange,
			this._paginator.page,
			this._sort.sortChange,
		];

		return Observable.merge(...displayDataChanges).map(() => {
			const sortedData = this.getSortedData();

			// Grab the page's slice of data.
			const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
			return sortedData.splice(startIndex, this._paginator.pageSize);
		});
	}

	disconnect(): void {

	}

	/** Returns a sorted copy of the database data. */
	getSortedData(): DeedData[] {
		const data = this._dataList.data.slice();
		console.log(data);
		if (!this._sort.active || this._sort.direction == '') { return data; }

		return data.sort((a, b) => {
			let result = 0;
			
			switch (this._sort.active) {
				case 'deedCode': 
					result = (a.deedCode.localeCompare(b.deedCode, 'en', {numeric: true})) * (this._sort.direction == 'asc' ? 1 : -1);
					break;
				case 'deedRef': 
					result = (a.deedRef.localeCompare(b.deedRef, 'en', {numeric: true})) * (this._sort.direction == 'asc' ? 1 : -1);
					break;
				case 'deedDate': 
					result = ((a.deedDate.year + '-' + a.deedDate.month + '-' + a.deedDate.day).localeCompare(b.deedDate.year + '-' + b.deedDate.month + '-' + b.deedDate.day, 'en', {numeric: true})) * (this._sort.direction == 'asc' ? 1 : -1);
					break;
				case 'deedName': 
					result = (a.deedName.localeCompare(b.deedName, 'ru')) * (this._sort.direction == 'asc' ? 1 : -1);	
					break;
			}

			return result;

		});
	}

}
