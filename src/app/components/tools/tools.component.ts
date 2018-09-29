import { Component, OnInit } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, PartialObserver } from 'rxjs'; import { map } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { FirstnamesService } from '../../services/firstnames.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {


  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    showProgressBar: false,
    pauseOnHover: false,
    animate: 'fade'
  }

  firstNames;
  firstNamesSorted;

  constructor(private firstnamesService: FirstnamesService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.firstNames = [];
    this.firstNamesSorted = [];
    this.firstnamesService.getFirstNames().subscribe(data => console.log(this.getFIrstnamesSorted(data)));

  }



  getFIrstnamesSorted(data) {
    const array = data.filter((element) => element.firstname);;
    array.sort(new Intl.Collator('ru').compare);
    return _.sortedUniq(array)
  }





}
